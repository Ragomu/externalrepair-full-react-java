package br.com.uisa.externalrepair.adapter.in.web.controller.maintenance;

import br.com.uisa.externalrepair.adapter.in.web.api.MaintenanceRepairApi;
import br.com.uisa.externalrepair.adapter.in.web.dto.MaintenanceRepairResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import br.com.uisa.externalrepair.config.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController()
@RequestMapping("/maintenance-nfs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MaintenanceRepairListController implements MaintenanceRepairApi {

    private final RepairRepository repairRepository;
    private final TokenProvider tokenProvider;

    @GetMapping("/{supplierDocument}")
    @Override
    public ResponseEntity<List<MaintenanceRepairResponse>> getMaintenanceRepairs(
            @PathVariable String supplierDocument,
            @RequestParam(required = false) String query,
            HttpServletRequest request) {
        Boolean isUisa = tokenProvider.isUisaToken(request);

        List<Repair> repairs;

        if (Boolean.TRUE.equals(isUisa)) {
            if (StringUtils.isNotEmpty(query)) {
                repairs =
                        repairRepository.findAllByStatusIsAndNfOrSubItemStatusNameIsMaintenance(
                                List.of(StatusName.NEGOCIACAO_IBID, StatusName.ANDAMENTO_REPARO),
                                query,
                                SubItemStatusName.MAINTENANCE);
            } else {
                repairs =
                        repairRepository.findAllByStatusIsOrSubItemStatusNameIsMaintenance(
                                List.of(StatusName.NEGOCIACAO_IBID, StatusName.ANDAMENTO_REPARO),
                                SubItemStatusName.MAINTENANCE);
            }
        } else {
            if (StringUtils.isNotEmpty(query)) {
                repairs =
                        repairRepository
                                .findAllBySupplierDocumentAndStatusIsAndNfOrSubItemStatusNameIsMaintenance(
                                        supplierDocument,
                                        List.of(StatusName.NEGOCIACAO_IBID, StatusName.ANDAMENTO_REPARO),
                                        query,
                                        SubItemStatusName.MAINTENANCE);
            } else {
                repairs =
                        repairRepository.findAllBySupplierDocumentAndStatusIsOrSubItemStatusNameIsMaintenance(
                                supplierDocument,
                                List.of(StatusName.NEGOCIACAO_IBID, StatusName.ANDAMENTO_REPARO),
                                SubItemStatusName.MAINTENANCE);
            }
        }

        List<MaintenanceRepairResponse> response =
                repairs.stream()
                        .map(
                                repair ->
                                        MaintenanceRepairResponse.builder()
                                                .nf(repair.getNf())
                                                .emissionDate(repair.getDepartureDateUisa())
                                                .issuer("Usinas Itamarati S/A")
                                                .receiver(repair.getSupplier().getName())
                                                .totalQuantity(
                                                        repair.getItems().stream()
                                                                .map(Item::getOutputQuantity)
                                                                .reduce(0L, Long::sum))
                                                .build())
                        .toList();

        return ResponseEntity.ok(response);
    }
}
