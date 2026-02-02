package br.com.uisa.externalrepair.application.service;

import br.com.uisa.externalrepair.adapter.in.web.dto.CreateRepairRequest;
import br.com.uisa.externalrepair.adapter.out.db.repository.LogisticRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.PersonRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.StatusRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SupplierRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.WarehouseRepository;
import br.com.uisa.externalrepair.application.domain.exception.FileStorageException;
import br.com.uisa.externalrepair.application.domain.mapper.CounterpartyMapper;
import br.com.uisa.externalrepair.application.domain.mapper.RepairMapper;
import br.com.uisa.externalrepair.application.domain.mapper.SupplierMapper;
import br.com.uisa.externalrepair.application.domain.mapper.TechnicalManagerMapper;
import br.com.uisa.externalrepair.application.domain.model.Logistic;
import br.com.uisa.externalrepair.application.domain.model.LogisticName;
import br.com.uisa.externalrepair.application.domain.model.Person;
import br.com.uisa.externalrepair.application.domain.model.PersonType;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.Role;
import br.com.uisa.externalrepair.application.domain.model.Status;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.domain.model.Supplier;
import br.com.uisa.externalrepair.application.domain.model.Warehouse;
import br.com.uisa.externalrepair.application.domain.model.WarehouseName;
import br.com.uisa.externalrepair.application.port.in.CreateRepairUseCase;
import br.com.uisa.externalrepair.application.util.RandomPasswordGenerator;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageException;
import com.google.cloud.storage.StorageOptions;
import java.io.IOException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CreateRepairService implements CreateRepairUseCase {

    private final SupplierMapper supplierMapper;
    private final CounterpartyMapper counterpartyMapper;
    private final TechnicalManagerMapper technicalManagerMapper;
    private final RepairMapper repairMapper;

    private final RandomPasswordGenerator passwordGenerator;

    private final EmailSenderService emailSenderService;
    private final NotificationService notificationService;
    private final ActionService actionService;
    private final RepairHistoryService repairHistoryService;

    private final StatusRepository statusRepository;
    private final SupplierRepository supplierRepository;
    private final WarehouseRepository warehouseRepository;
    private final LogisticRepository logisticRepository;
    private final PersonRepository personRepository;
    private final RepairRepository repairRepository;

    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    @Override
    public void handleCreateRepair(CreateRepairRequest request, MultipartFile pdf) {
        Supplier supplier = supplierMapper.toSupplier(request, Role.SUPPLIER);
        Person counterparty = counterpartyMapper.toCounterparty(request, PersonType.COUNTERPARTY);
        Person technicalManager =
                technicalManagerMapper.toTechnicalManager(request, PersonType.TECHNICAL_MANAGER);

        Status status = statusRepository.findByName(StatusName.INICIO_REPARO);
        Warehouse warehouse =
                warehouseRepository.findByName(WarehouseName.valueOf(request.warehouse()));
        Logistic logistic = logisticRepository.findByName(LogisticName.valueOf(request.logistic()));

        Repair repair =
                repairMapper.toRepair(
                        request, warehouse, supplier, counterparty, technicalManager, logistic, status);

        repair.getItems().forEach(item -> item.setRepair(repair));

        if (!supplierRepository.existsByDocumentAndEmail(supplier.getDocument(), supplier.getEmail())) {
            String password = passwordGenerator.generatePassword();
            supplier.setPassword(new BCryptPasswordEncoder().encode(password));
            supplierRepository.save(supplier);
            emailSenderService.sendEmail(
                    supplier.getEmail(),
                    "UISA: Cadastro de fornecedor realizado com sucesso",
                    "Olá, "
                            + supplier.getName()
                            + ".\n\n"
                            + "Seu cadastro foi realizado com sucesso. \n\n"
                            + "Segue abaixo os dados de acesso ao sistema:\n"
                            + "Usuário: "
                            + supplier.getEmail()
                            + "\n"
                            + "Senha: "
                            + password
                            + "\n\n"
                            + "Atenciosamente,\n"
                            + "Equipe UISA");
        }

        personRepository.save(counterparty);
        personRepository.save(technicalManager);
        repairRepository.save(repair);

        String bucketName = "reparo-externo";
        BlobInfo blobInfo =
                BlobInfo.newBuilder(
                                bucketName,
                                "/pdfs/"
                                        + repair.getSupplier().getDocument()
                                        + "/"
                                        + repair.getNf()
                                        + "/"
                                        + Objects.requireNonNull(pdf.getOriginalFilename()))
                        .setContentType(pdf.getContentType())
                        .build();

        savePdf(blobInfo, pdf);

        notificationService.saveNotification(
                counterparty, "Enviou um equipamento para manutenção", repair.getNf(), supplier);

        actionService.saveAction(
                "Recebimento",
                "Você tem " + repair.getItems().size() + " itens que precisam de sua atenção",
                repair.getNf(),
                supplier);

        repairHistoryService.registerStatusChange(
                repair, "Início", "Solicitação de manutenção iniciada, itens em trânsito.");
    }

    private void savePdf(BlobInfo blobInfo, MultipartFile file) {
        try {
            storage.create(blobInfo, file.getBytes());
        } catch (StorageException | IOException e) {
            throw new FileStorageException("Erro ao salvar arquivo: " + file.getOriginalFilename());
        }
    }
}
