package br.com.uisa.externalrepair.adapter.in.web.controller.warehouse;

import br.com.uisa.externalrepair.adapter.in.web.dto.WarehouseItemResponse;
import br.com.uisa.externalrepair.adapter.in.web.dto.WarehouseItemStatus;
import br.com.uisa.externalrepair.adapter.in.web.dto.WarehouseStatus;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.MaintenanceType;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/warehouse-items")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WarehouseItemListController {

    private final RepairRepository repairRepository;

    @GetMapping("/{nf}")
    public ResponseEntity<WarehouseItemResponse> getWarehouseItemList(@PathVariable String nf) {

        List<Repair> repairs = repairRepository.findAllByNf(nf);

        if (repairs.getFirst().getMaintenanceType().equals(MaintenanceType.PARTIAL.getValue())) {
            WarehouseItemResponse warehouseItemResponse =
                    repairs.stream()
                            .map(
                                    repair ->
                                            WarehouseItemResponse.builder()
                                                    .nf(nf)
                                                    .fluigNumber(repair.getFluigNumber())
                                                    .warehouseStatus(getWarehouseStatusBySubItems(repair).getValue())
                                                    .items(
                                                            repair.getItems().stream()
                                                                    .flatMap(
                                                                            item ->
                                                                                    item.getSubItems().stream()
                                                                                            .filter(
                                                                                                    subItem ->
                                                                                                            subItem
                                                                                                                    .getStatus()
                                                                                                                    .contains(SubItemStatusName.WAREHOUSE))
                                                                                            .map(
                                                                                                    subItem ->
                                                                                                            WarehouseItemResponse.ItemResponse.builder()
                                                                                                                    .id(subItem.getId())
                                                                                                                    .material(item.getMaterial())
                                                                                                                    .returnedQuantity(
                                                                                                                            subItem.getReturnQuantity() != null
                                                                                                                                    ? subItem.getReturnQuantity()
                                                                                                                                    : subItem
                                                                                                                                            .getIrreparableQuantity())
                                                                                                                    .unitValue(item.getUnitValue())
                                                                                                                    .dimensions(item.getDimensions())
                                                                                                                    .label(item.getLabel())
                                                                                                                    .description(item.getDescription())
                                                                                                                    .date(item.getReceiptDate())
                                                                                                                    .unitWeight(item.getUnitWeight())
                                                                                                                    .warehouseItemStatus(
                                                                                                                            getWarehouseSubItemStatus(subItem)
                                                                                                                                    .getValue())
                                                                                                                    .receivedQuantity(
                                                                                                                            item.getWarehouseReceivedQuantity())
                                                                                                                    .receiptDate(
                                                                                                                            item.getWarehouseReceiptDate())
                                                                                                                    .build()))
                                                                    .collect(Collectors.toList()))
                                                    .build())
                            .findAny()
                            .orElse(WarehouseItemResponse.builder().nf(nf).build());

            return ResponseEntity.ok(warehouseItemResponse);
        }

        WarehouseItemResponse warehouseItemResponse =
                repairs.stream()
                        .map(
                                repair ->
                                        WarehouseItemResponse.builder()
                                                .nf(nf)
                                                .fluigNumber(repair.getFluigNumber())
                                                .warehouseStatus(getWarehouseStatus(repair).getValue())
                                                .items(
                                                        repair.getItems().stream()
                                                                .map(
                                                                        item ->
                                                                                WarehouseItemResponse.ItemResponse.builder()
                                                                                        .id(item.getId())
                                                                                        .material(item.getMaterial())
                                                                                        .returnedQuantity(item.getQuantity())
                                                                                        .unitValue(item.getUnitValue())
                                                                                        .dimensions(item.getDimensions())
                                                                                        .label(item.getLabel())
                                                                                        .description(item.getDescription())
                                                                                        .date(item.getReceiptDate())
                                                                                        .unitWeight(item.getUnitWeight())
                                                                                        .warehouseItemStatus(
                                                                                                getWarehouseItemStatus(item).getValue())
                                                                                        .receivedQuantity(item.getWarehouseReceivedQuantity())
                                                                                        .receiptDate(item.getWarehouseReceiptDate())
                                                                                        .build())
                                                                .collect(Collectors.toList()))
                                                .build())
                        .findAny()
                        .orElse(WarehouseItemResponse.builder().nf(nf).build());

        return ResponseEntity.ok(warehouseItemResponse);
    }

    private WarehouseStatus getWarehouseStatusBySubItems(Repair repair) {
        if (repair.getItems().stream()
                .flatMap(item -> item.getSubItems().stream())
                .filter(subItem -> subItem.getStatus().contains(SubItemStatusName.WAREHOUSE))
                .allMatch(
                        subItem -> subItem.getWarehouseReceived() != null && subItem.getWarehouseReceived())) {
            return WarehouseStatus.FINISHED;
        } else if (repair.getItems().stream()
                        .flatMap(item -> item.getSubItems().stream())
                        .filter(subItem -> subItem.getStatus().contains(SubItemStatusName.WAREHOUSE))
                        .anyMatch(
                                subItem -> subItem.getWarehouseReceived() != null && subItem.getWarehouseReceived())
                && repair.getItems().stream()
                                .flatMap(item -> item.getSubItems().stream())
                                .filter(subItem -> subItem.getStatus().contains(SubItemStatusName.WAREHOUSE))
                                .filter(
                                        subItem ->
                                                subItem.getWarehouseReceived() != null && subItem.getWarehouseReceived())
                                .count()
                        < repair.getItems().stream()
                                .flatMap(item -> item.getSubItems().stream())
                                .filter(subItem -> subItem.getStatus().contains(SubItemStatusName.WAREHOUSE))
                                .count()) {
            return WarehouseStatus.PENDING;
        }
        return WarehouseStatus.NONE;
    }

    private WarehouseStatus getWarehouseStatus(Repair repair) {
        if (repair.getStatus().getName().equals(StatusName.FINALIZADO)) {
            return WarehouseStatus.FINISHED;
        } else if (repair.getItems().stream()
                        .anyMatch(item -> item.getWarehouseReceived() != null && item.getWarehouseReceived())
                && repair.getItems().stream()
                                .filter(item -> item.getWarehouseReceived() != null && item.getWarehouseReceived())
                                .count()
                        < repair.getItems().size()) {
            return WarehouseStatus.PENDING;
        }
        return WarehouseStatus.NONE;
    }

    private WarehouseItemStatus getWarehouseItemStatus(Item item) {
        if (item.getWarehouseReceived() != null && item.getWarehouseReceived()) {
            return WarehouseItemStatus.RECEIVED;
        }
        return WarehouseItemStatus.NONE;
    }

    private WarehouseItemStatus getWarehouseSubItemStatus(SubItem subItem) {
        if (subItem.getWarehouseReceived() != null && subItem.getWarehouseReceived()) {
            return WarehouseItemStatus.RECEIVED;
        }
        return WarehouseItemStatus.NONE;
    }
}
