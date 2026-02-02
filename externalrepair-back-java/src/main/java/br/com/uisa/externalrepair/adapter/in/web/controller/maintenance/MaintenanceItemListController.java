package br.com.uisa.externalrepair.adapter.in.web.controller.maintenance;

import br.com.uisa.externalrepair.adapter.in.web.dto.MaintenanceItemResponse;
import br.com.uisa.externalrepair.adapter.in.web.dto.MaintenanceStatus;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairMaintenanceRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.RepairMaintenance;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.config.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController()
@RequestMapping("/maintenance-items")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MaintenanceItemListController {

    private final RepairRepository repairRepository;
    private final RepairMaintenanceRepository repairMaintenanceRepository;
    private final TokenProvider tokenProvider;

    @GetMapping("/{supplierDocument}/{nf}")
    public ResponseEntity<MaintenanceItemResponse> getMaintenanceItems(
            @PathVariable String supplierDocument, @PathVariable String nf, HttpServletRequest request) {
        log.info("Fetching maintenance items");

        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        String isUisa = tokenProvider.getPayload(token, "isUisa");

        List<RepairMaintenance> repairMaintenances;
        List<Repair> repairs;

        // Verificar se o usuário é da UISA
        if (isUisa.equals("true")) {
            // Usuários UISA podem ver todos os reparos
            repairMaintenances = repairMaintenanceRepository.findAllByRepairNf(nf);
            repairs = repairRepository.findAllByNf(nf);
        } else {
            // Fornecedores normais veem apenas seus próprios reparos
            repairMaintenances =
                    repairMaintenanceRepository.findAllByRepairSupplierDocumentAndRepairNf(
                            supplierDocument, nf);
            repairs = repairRepository.findAllBySupplierDocumentAndNf(supplierDocument, nf);
        }

        MaintenanceItemResponse response =
                repairs.stream()
                        .map(
                                repair ->
                                        MaintenanceItemResponse.builder()
                                                .nf(repair.getNf())
                                                .fluigNumber(repair.getFluigNumber())
                                                .returnNf(repair.getReturnNf())
                                                .maintenanceStatus(getMaintenanceStatus(repair).getValue())
                                                .justification(
                                                        repair.getReproved() != null ? repair.getJustification() : null)
                                                .sentNfs(
                                                        repairMaintenances.stream()
                                                                .map(
                                                                        repairMaintenance ->
                                                                                MaintenanceItemResponse.SentNf.builder()
                                                                                        .returnNf(repairMaintenance.getReturnNf())
                                                                                        .justification(repairMaintenance.getJustification())
                                                                                        .build())
                                                                .toList())
                                                .items(
                                                        repair.getItems().stream()
                                                                .map(
                                                                        item ->
                                                                                MaintenanceItemResponse.ItemResponse.builder()
                                                                                        .id(item.getId())
                                                                                        .material(item.getMaterial())
                                                                                        .description(item.getDescription())
                                                                                        .quantity(item.getReceivedQuantity())
                                                                                        .unitPrice(item.getUnitValue())
                                                                                        .totalPrice(item.getTotalValue())
                                                                                        .dimensions(item.getDimensions())
                                                                                        .date(item.getReceiptDate())
                                                                                        .build())
                                                                .toList())
                                                .build())
                        .findAny()
                        .orElse(MaintenanceItemResponse.builder().nf(nf).items(List.of()).build());

        return ResponseEntity.ok(response);
    }

    private MaintenanceStatus getMaintenanceStatus(Repair repair) {
        if (repair.getReproved() != null && repair.getReproved()) {
            return MaintenanceStatus.REPROVED;
        } else if (repair.getStatus().getName().equals(StatusName.ANDAMENTO_REPARO)
                && repair.getReturnNf() != null
                && repair.getReproved() == null) {
            return MaintenanceStatus.SENT;
        } else if (repair.getStatus().getName().equals(StatusName.ANALISE_FISCAL)) {
            return MaintenanceStatus.APPROVED;
        } else if (repair.getCorrectionSent() != null && repair.getCorrectionSent()) {
            return MaintenanceStatus.CORRECTION_SENT;
        }
        return MaintenanceStatus.NOT_INITIALIZED;
    }
}
