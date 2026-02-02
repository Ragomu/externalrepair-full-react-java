package br.com.uisa.externalrepair.adapter.in.web.controller.maintenance;

import br.com.uisa.externalrepair.adapter.in.web.dto.CompleteMaintenanceRepairRequest;
import br.com.uisa.externalrepair.adapter.out.db.repository.AdditionalNfRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairMaintenanceRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.exception.FileStorageException;
import br.com.uisa.externalrepair.application.domain.model.AdditionalNf;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.MaintenanceType;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.RepairMaintenance;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.service.RepairHistoryService;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageException;
import com.google.cloud.storage.StorageOptions;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequestMapping("/complete-maintenance")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CompleteMaintenanceRepairController {

    private final RepairRepository repairRepository;
    private final RepairMaintenanceRepository repairMaintenanceRepository;
    private final AdditionalNfRepository additionalNfRepository;

    private final RepairHistoryService repairHistoryService;

    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    @PostMapping("/{supplierDocument}/{nf}")
    @Transactional
    public void completeMaintenanceRepair(
            @PathVariable String supplierDocument,
            @PathVariable String nf,
            @RequestPart CompleteMaintenanceRepairRequest request,
            @RequestPart(required = false) MultipartFile returnNfFile,
            @RequestPart(required = false) List<MultipartFile> additionalNfFiles) {
        repairRepository.updateByReturnNfAndReturnDate(
                supplierDocument, nf, request.returnNfNumber(), request.returnDate());
        repairRepository.updateByStatus(nf, StatusName.ANDAMENTO_REPARO);
        repairRepository.updateByMaintenanceType(
                supplierDocument, nf, MaintenanceType.COMPLETE.getValue());
        Repair repair =
                repairRepository.findAllBySupplierDocumentAndNf(supplierDocument, nf).stream()
                        .findFirst()
                        .orElseThrow();

        if (repair.getReproved() != null && repair.getReproved()) {
            repairRepository.updateByCorrectionSent(supplierDocument, nf, true);
        }

        RepairMaintenance repairMaintenance =
                RepairMaintenance.builder()
                        .returnNf(request.returnNfNumber())
                        .returnDate(request.returnDate())
                        .repair(repair)
                        .build();

        repairMaintenanceRepository.save(repairMaintenance);

        if (!(returnNfFile == null)) {
            log.info("Salvando PDF para o fornecedor: {}, NF: {}", supplierDocument, nf);
        } else {
            log.warn("Nenhum PDF fornecido para o fornecedor: {}, NF: {}", supplierDocument, nf);
            repairRepository.updateByStatus(nf, StatusName.NEGOCIACAO_IBID);
            repairRepository.updateByMaintenanceType(
                    supplierDocument, nf, MaintenanceType.NONE.getValue());
            return;
        }
        savePdf(supplierDocument, nf, request.returnNfNumber(), returnNfFile);

        saveAdditionalNfs(
                supplierDocument, nf, additionalNfFiles, request.additionalNfNumbers(), repair);

        repairHistoryService.registerStatusChange(
                repair,
                "Manutenção",
                "Manutenção sinalizada. "
                        + repair.getItems().stream().map(Item::getOutputQuantity).reduce(0L, Long::sum)
                        + " itens enviados | "
                        + repair.getItems().stream().map(Item::getReceivedQuantity).reduce(0L, Long::sum)
                        + " itens recebidos");
    }

    private void savePdf(String supplierDocument, String nf, String returnNf, MultipartFile pdf) {
        try {
            String blobName =
                    String.format(
                            "/completed-repairs/%s/%s/%s/%s",
                            supplierDocument, nf, returnNf, pdf.getOriginalFilename());
            String bucketName = "reparo-externo";
            storage.create(
                    BlobInfo.newBuilder(bucketName, blobName).setContentType(pdf.getContentType()).build(),
                    pdf.getBytes());
        } catch (StorageException | IOException e) {
            throw new FileStorageException("Erro ao salvar arquivo: " + pdf.getOriginalFilename());
        }
    }

    private void saveAdditionalNfs(
            String supplierDocument,
            String nf,
            List<MultipartFile> additionalNfFiles,
            List<String> additionalNfNumbers,
            Repair repair) {
        if (additionalNfNumbers != null
                && additionalNfFiles != null
                && additionalNfNumbers.size() == additionalNfFiles.size()) {
            for (int i = 0; i < additionalNfNumbers.size(); i++) {
                String additionalNfNumber = additionalNfNumbers.get(i);
                MultipartFile file = additionalNfFiles.get(i);
                String path = String.format("additionalNfs/%s", additionalNfNumber);
                savePdf(supplierDocument, nf, path, file);

                AdditionalNf additionalNf =
                        AdditionalNf.builder()
                                .repair(repair)
                                .nfNumber(additionalNfNumber)
                                .fileName(file.getOriginalFilename())
                                .build();

                additionalNfRepository.save(additionalNf);
            }
        }
    }
}
