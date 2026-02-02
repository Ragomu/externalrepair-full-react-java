package br.com.uisa.externalrepair.adapter.in.web.controller;

import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.exception.FileStorageException;
import br.com.uisa.externalrepair.application.domain.model.SubItemLabel;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageException;
import com.google.cloud.storage.StorageOptions;
import java.io.IOException;
import java.util.NoSuchElementException;
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
@RestController
@RequestMapping("/send-discard-report")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SendDiscardReport {

    private final SubItemRepository subItemRepository;

    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    @PostMapping("/{subItemId}")
    public ResponseEntity<Void> sendDiscardReport(
            @PathVariable Long subItemId, @RequestPart MultipartFile discardReportFile) {
        savePdf(subItemId.toString(), discardReportFile);

        String nf =
                subItemRepository
                        .findById(subItemId)
                        .orElseThrow(NoSuchElementException::new)
                        .getItem()
                        .getRepair()
                        .getNf();

        subItemRepository.updateBySubItemLabel(subItemId, nf, SubItemLabel.CORRECTION_SENT);

        return ResponseEntity.ok().build();
    }

    private void savePdf(String subItemId, MultipartFile pdf) {
        try {
            String blobName =
                    String.format("/discard-reports/%s/%s", subItemId, pdf.getOriginalFilename());
            String bucketName = "reparo-externo";
            storage.create(
                    BlobInfo.newBuilder(bucketName, blobName).setContentType(pdf.getContentType()).build(),
                    pdf.getBytes());
        } catch (StorageException | IOException e) {
            throw new FileStorageException("Erro ao salvar arquivo: " + pdf.getOriginalFilename());
        }
    }
}
