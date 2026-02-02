package br.com.uisa.externalrepair.adapter.in.web.controller.logistic;

import br.com.uisa.externalrepair.adapter.in.web.dto.LogisticRepairResponse;
import br.com.uisa.externalrepair.adapter.in.web.dto.LogisticStatus;
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
@RestController()
@RequestMapping("/logistic-nfs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LogisticRepairListController {

    private final RepairRepository repairRepository;

    @GetMapping
    public ResponseEntity<List<LogisticRepairResponse>> getLogisticRepairList(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        List<Repair> repairs =
                repairRepository.findAllByStatusNameOrSubItemStatusNameIs(
                        StatusName.ANALISE_FISCAL, SubItemStatusName.LOGISTICS);

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
                                    StatusName.ANALISE_FISCAL,
                                    SubItemStatusName.LOGISTICS);
        } else if (StringUtils.isNotEmpty(query) && StringUtils.isNotEmpty(status)) {
            repairs =
                    repairRepository.findAllByNfAndMaintenanceTypeAndStatusNameOrSubItemStatusNameIs(
                            query,
                            MaintenanceType.valueOf(status).getValue(),
                            StatusName.ANALISE_FISCAL,
                            SubItemStatusName.LOGISTICS);
        } else if (StringUtils.isNotEmpty(query)) {
            repairs =
                    repairRepository.findAllByStatusNameAndNfOrSubItemStatusNameIs(
                            StatusName.ANALISE_FISCAL, query, SubItemStatusName.LOGISTICS);
        }

        List<LogisticRepairResponse> response =
                repairs.stream()
                        .map(
                                repair ->
                                        LogisticRepairResponse.builder()
                                                .nf(repair.getNf())
                                                .emissionDate(repair.getDepartureDateUisa())
                                                .issuer("Usinas Itamarati S/A")
                                                .receiver(repair.getSupplier().getName())
                                                .totalQuantity(
                                                        repair.getItems().stream()
                                                                .map(Item::getOutputQuantity)
                                                                .reduce(0L, Long::sum))
                                                .status(getLogisticStatus(repair).getValue())
                                                .build())
                        .toList();

        return ResponseEntity.ok(response);
    }

    private LogisticStatus getLogisticStatus(Repair repair) {
        if (repair.getMaintenanceType().equals(MaintenanceType.COMPLETE.getValue())) {
            return LogisticStatus.COMPLETE;
        }
        return LogisticStatus.PARTIAL;
    }
}
