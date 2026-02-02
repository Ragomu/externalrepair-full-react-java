package br.com.uisa.externalrepair.adapter.in.web.controller.subitem;

import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.in.web.dto.SendCorrectionSubItemRequest;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemMaintenanceRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.exception.FileStorageException;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import br.com.uisa.externalrepair.application.domain.model.SubItemLabel;
import br.com.uisa.externalrepair.application.domain.model.SubItemMaintenance;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageException;
import com.google.cloud.storage.StorageOptions;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RestController()
@RequestMapping("/send-correction-sub-item")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SendCorrectionSubItemController {

    private final SubItemRepository subItemRepository;
    private final SubItemMaintenanceRepository subItemMaintenanceRepository;
    private final ItemRepository itemRepository;

    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    @PostMapping("/{supplierDocument}/{nf}")
    public ResponseEntity<Void> sendCorrectionSubItem(
            @PathVariable String supplierDocument,
            @PathVariable String nf,
            @RequestPart SendCorrectionSubItemRequest request,
            @RequestPart(required = false) MultipartFile returnNfFile) {

        subItemRepository.updateByReturnNfDateAndReturnNfNumberAndReturnQuantity(
                request.subItemId(),
                supplierDocument,
                nf,
                request.returnNfDate(),
                request.returnNfNumber(),
                request.returnQuantity());
        subItemRepository.updateBySubItemLabel(request.subItemId(), nf, SubItemLabel.CORRECTION_SENT);

        SubItem subItem = subItemRepository.findById(request.subItemId()).orElse(null);
        subItem.setStatus(new ArrayList<>(List.of(SubItemStatusName.FISCAL)));
        subItemRepository.save(subItem);

        SubItemMaintenance subItemMaintenance =
                SubItemMaintenance.builder()
                        .subItem(subItem)
                        .returnNfNumber(request.returnNfNumber())
                        .returnNfDate(request.returnNfDate())
                        .build();

        subItemMaintenanceRepository.save(subItemMaintenance);

        itemRepository.updateByItemStatus(
                subItem.getItem().getId(), nf, supplierDocument, ItemStatus.INITIALIZED.getStatus());

        if (returnNfFile != null && !returnNfFile.isEmpty()) {
            savePdf(supplierDocument, nf, String.valueOf(subItem.getId()), returnNfFile);
        }

        return ResponseEntity.ok().build();
    }

    private void savePdf(String supplierDocument, String nf, String subItemId, MultipartFile pdf) {
        try {
            String blobName =
                    String.format(
                            "/sub-items/%s/%s/%s/%s", supplierDocument, nf, subItemId, pdf.getOriginalFilename());
            String bucketName = "reparo-externo";
            storage.create(
                    BlobInfo.newBuilder(bucketName, blobName).setContentType(pdf.getContentType()).build(),
                    pdf.getBytes());
        } catch (StorageException | IOException e) {
            throw new FileStorageException("Erro ao salvar arquivo: " + pdf.getOriginalFilename());
        }
    }
}
