package br.com.uisa.externalrepair.adapter.in.web.controller.warehouse;

import br.com.uisa.externalrepair.adapter.in.web.dto.WarehouseRepairResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/warehouse-nfs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WarehouseRepairListController {

    private final RepairRepository repairRepository;

    @GetMapping
    public ResponseEntity<List<WarehouseRepairResponse>> getWarehouseRepairList(
            @RequestParam(required = false) String query) {

        List<Repair> repairs =
                repairRepository.findAllByStatusNameOrSubItemStatusNameIs(
                        StatusName.DEFINICAO_TRANSPORTE, SubItemStatusName.WAREHOUSE);

        if (StringUtils.isNotEmpty(query)) {
            repairs =
                    repairRepository.findAllByStatusNameAndNfOrSubItemStatusNameIs(
                            StatusName.DEFINICAO_TRANSPORTE, query, SubItemStatusName.WAREHOUSE);
        }

        List<WarehouseRepairResponse> warehouseRepairList =
                repairs.stream()
                        .map(
                                repair ->
                                        WarehouseRepairResponse.builder()
                                                .nf(repair.getNf())
                                                .emissionDate(repair.getDepartureDateUisa())
                                                .issuer("Usinas Itamarati S/A")
                                                .receiver(repair.getSupplier().getName())
                                                .totalQuantity(
                                                        repair.getItems().stream().mapToLong(Item::getQuantity).sum())
                                                .build())
                        .toList();

        return ResponseEntity.ok(warehouseRepairList);
    }
}
