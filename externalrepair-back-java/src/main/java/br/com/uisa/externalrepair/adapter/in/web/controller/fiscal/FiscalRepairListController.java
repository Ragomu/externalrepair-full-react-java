package br.com.uisa.externalrepair.adapter.in.web.controller.fiscal;

import br.com.uisa.externalrepair.adapter.in.web.dto.FiscalRepairResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.MaintenanceType;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/fiscal-nfs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FiscalRepairListController {

    private final RepairRepository repairRepository;

    @GetMapping
    public ResponseEntity<List<FiscalRepairResponse>> getFiscalRepairList(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        log.info("Fetching fiscal repair list");

        List<Repair> repairs =
                repairRepository.findAllByStatusNameOrSubItemStatusNameIs(
                        StatusName.ANDAMENTO_REPARO, SubItemStatusName.FISCAL);

        if (StringUtils.isNotEmpty(query)
                && StringUtils.isNotEmpty(status)
                && StringUtils.isNotEmpty(startDate)
                && StringUtils.isNotEmpty(endDate)) {
            repairs =
                    repairRepository
                            .findAllByNfAndMaintenanceTypeAndDateRangeAndStatusNameOrSubItemStatusNameIs(
                                    query,
                                    MaintenanceType.valueOf(status).getValue(),
                                    startDate,
                                    endDate,
                                    StatusName.ANDAMENTO_REPARO,
                                    SubItemStatusName.FISCAL);
        } else if (StringUtils.isNotEmpty(query) && StringUtils.isNotEmpty(status)) {
            repairs =
                    repairRepository.findAllByNfAndMaintenanceTypeAndStatusNameOrSubItemStatusNameIs(
                            query,
                            MaintenanceType.valueOf(status).getValue(),
                            StatusName.ANDAMENTO_REPARO,
                            SubItemStatusName.FISCAL);
        } else if (StringUtils.isNotEmpty(query)) {
            repairs =
                    repairRepository.findAllByStatusNameAndNfOrSubItemStatusNameIs(
                            StatusName.ANDAMENTO_REPARO, query, SubItemStatusName.FISCAL);
        }

        List<FiscalRepairResponse> response =
                repairs.stream()
                        .map(
                                repair ->
                                        FiscalRepairResponse.builder()
                                                .nf(repair.getNf())
                                                .emissionDate(repair.getDepartureDateUisa())
                                                .issuer("Usinas Itamarati S/A")
                                                .receiver(repair.getSupplier().getName())
                                                .totalQuantity(
                                                        repair.getItems().stream()
                                                                .map(Item::getOutputQuantity)
                                                                .reduce(0L, Long::sum)
                                                                .intValue())
                                                .status(
                                                        repair.getMaintenanceType() == null
                                                                ? MaintenanceType.NONE.getValue()
                                                                : repair.getMaintenanceType())
                                                .build())
                        .toList();

        return ResponseEntity.ok(response);
    }
}
