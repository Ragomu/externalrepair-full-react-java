package br.com.uisa.externalrepair.adapter.in.web.controller.subitem;

import br.com.uisa.externalrepair.adapter.in.web.dto.FlagSubItemRequest;
import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemMaintenanceRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.exception.FileStorageException;
import br.com.uisa.externalrepair.application.domain.model.DestinyItem;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.MaintenanceType;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import br.com.uisa.externalrepair.application.domain.model.SubItemLabel;
import br.com.uisa.externalrepair.application.domain.model.SubItemMaintenance;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatus;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import br.com.uisa.externalrepair.application.service.RepairHistoryService;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageException;
import com.google.cloud.storage.StorageOptions;
import jakarta.transaction.Transactional;
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
@RequestMapping("/flag-sub-item")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FlagSubItemController {

    private final SubItemRepository subItemRepository;
    private final SubItemMaintenanceRepository subItemMaintenanceRepository;
    private final ItemRepository itemRepository;
    private final RepairRepository repairRepository;

    private final RepairHistoryService repairHistoryService;

    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    @PostMapping("/{supplierDocument}/{nf}")
    @Transactional
    public ResponseEntity<Void> flagSubItem(
            @PathVariable String supplierDocument,
            @PathVariable String nf,
            @RequestPart FlagSubItemRequest request,
            @RequestPart MultipartFile returnNfFile,
            @RequestPart(required = false) List<MultipartFile> additionalNfFiles) {
        repairRepository.updateByMaintenanceType(
                supplierDocument, nf, MaintenanceType.PARTIAL.getValue());

        Item item = itemRepository.findById(request.id()).orElse(null);

        SubItem subItem =
                SubItem.builder()
                        .item(item)
                        .returnNfNumber(request.returnNfNumber())
                        .returnNfDate(request.returnNfDate())
                        .returnQuantity(request.returnQuantity())
                        .subItemLabel(SubItemLabel.WAITING_APPROVAL)
                        .subItemStatus(SubItemStatus.RETURNABLE)
                        .destinyItem(DestinyItem.fromValue(request.destinyItem()))
                        .status(
                                new ArrayList<>(List.of(SubItemStatusName.FISCAL, SubItemStatusName.MAINTENANCE)))
                        .build();

        subItemRepository.save(subItem);

        SubItemMaintenance subItemMaintenance =
                SubItemMaintenance.builder()
                        .subItem(subItem)
                        .returnNfNumber(request.returnNfNumber())
                        .returnNfDate(request.returnNfDate())
                        .build();

        subItemMaintenanceRepository.save(subItemMaintenance);

        savePdf(supplierDocument, nf, String.valueOf(subItem.getId()), returnNfFile);

        itemRepository.updateByItemStatus(
                request.id(), nf, supplierDocument, ItemStatus.INITIALIZED.getStatus());

        Repair repair =
                repairRepository.findAllBySupplierDocumentAndNf(supplierDocument, nf).stream()
                        .findFirst()
                        .orElseThrow();

        repairHistoryService.registerStatusChange(
                repair,
                "Manutenção",
                "Manutenção sinalizada. "
                        + repair.getItems().stream().map(Item::getOutputQuantity).reduce(0L, Long::sum)
                        + " itens enviados | "
                        + repair.getItems().stream().map(Item::getReceivedQuantity).reduce(0L, Long::sum)
                        + " itens recebidos");

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
