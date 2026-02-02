package br.com.uisa.externalrepair.application.service;

import br.com.uisa.externalrepair.adapter.out.db.repository.PhotoRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.exception.FileStorageException;
import br.com.uisa.externalrepair.application.domain.mapper.PhotoMapper;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.port.in.ReceiptUseCase;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageException;
import com.google.cloud.storage.StorageOptions;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class ReceiptRequestService implements ReceiptUseCase {

    private final PhotoMapper photoMapper;
    private final RepairRepository repairRepository;
    private final PhotoRepository photoRepository;

    private final RepairHistoryService repairHistoryService;

    private final Storage storage = StorageOptions.getDefaultInstance().getService();
    private final String bucketName = "reparo-externo";

    @Override
    public void handleReceiptEquipment(
            String supplierDocument, String nf, List<MultipartFile> equipmentImage) {
        equipmentImage.forEach(
                file -> {
                    //                    Photo photo =
                    // photoRepository.save(photoMapper.toPhoto(file.getOriginalFilename()));
                    //                    photoRepository.updateByRepair(photo.getId(), nf);
                    repairRepository.updateByStatus(nf, StatusName.ENTRADA_RECEBIDA);

                    BlobInfo blobInfo =
                            BlobInfo.newBuilder(
                                            bucketName,
                                            "/received-images/"
                                                    + supplierDocument
                                                    + "/"
                                                    + nf
                                                    + "/"
                                                    + Objects.requireNonNull(file.getOriginalFilename()))
                                    .setContentType(file.getContentType())
                                    .build();

                    savePhoto(blobInfo, file);
                });

        Repair repair = repairRepository.findAllByNf(nf).getFirst();

        repairHistoryService.registerStatusChange(
                repair,
                "Recebimento",
                "Recebimento sinalizado de "
                        + repair.getItems().stream().mapToLong(Item::getReceivedQuantity).sum()
                        + " itens. NF-e encaminhado para negociação.");
    }

    private void savePhoto(BlobInfo blobInfo, MultipartFile file) {
        try {
            storage.create(blobInfo, file.getBytes());
        } catch (StorageException | IOException e) {
            throw new FileStorageException("Erro ao salvar arquivo: " + file.getOriginalFilename());
        }
    }
}
