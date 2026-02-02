package br.com.uisa.externalrepair.adapter.in.web.controller.logistic;

import br.com.uisa.externalrepair.adapter.in.web.dto.LogisticItemResponse;
import br.com.uisa.externalrepair.adapter.in.web.dto.LogisticItemStatus;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/logistic-items")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LogisticItemListController {

    private final RepairRepository repairRepository;

    @GetMapping("/{nf}")
    public ResponseEntity<List<LogisticItemResponse>> getLogisticItemList(@PathVariable String nf) {
        log.info("Fetching logistic item list for nf: {}", nf);

        List<Repair> repairs = repairRepository.findAllByNf(nf);

        if (repairs.getFirst().getMaintenanceType().equals(MaintenanceType.PARTIAL.getValue())) {
            List<LogisticItemResponse> response =
                    repairs.stream()
                            .map(
                                    repair ->
                                            LogisticItemResponse.builder()
                                                    .nf(repair.getNf())
                                                    .logisticStatus(getLogisticStatusBySubItems(repair))
                                                    .fluigNumber(repair.getFluigNumber())
                                                    .items(
                                                            repair.getItems().stream()
                                                                    .flatMap(
                                                                            item ->
                                                                                    item.getSubItems().stream()
                                                                                            .filter(
                                                                                                    subItem ->
                                                                                                            subItem
                                                                                                                    .getStatus()
                                                                                                                    .contains(SubItemStatusName.LOGISTICS))
                                                                                            .map(
                                                                                                    subItem ->
                                                                                                            LogisticItemResponse.ItemResponse.builder()
                                                                                                                    .id(subItem.getId())
                                                                                                                    .request(repair.getRequest())
                                                                                                                    .material(item.getMaterial())
                                                                                                                    .description(item.getDescription())
                                                                                                                    .quantity(subItem.getReturnQuantity())
                                                                                                                    .unitPrice(item.getUnitValue())
                                                                                                                    .totalPrice(item.getTotalValue())
                                                                                                                    .dimensions(item.getDimensions())
                                                                                                                    .shippingDate(item.getReceiptDate())
                                                                                                                    .label(item.getLabel())
                                                                                                                    .logisticItemStatus(
                                                                                                                            getLogisticSubItemStatus(subItem)
                                                                                                                                    .getValue())
                                                                                                                    .build()))
                                                                    .collect(Collectors.toList()))
                                                    .build())
                            .toList();

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(
                repairs.stream()
                        .map(
                                repair ->
                                        LogisticItemResponse.builder()
                                                .nf(repair.getNf())
                                                .logisticStatus(
                                                        repair.getStatus().getName().equals(StatusName.DEFINICAO_TRANSPORTE)
                                                                ? "completed"
                                                                : "none")
                                                .fluigNumber(repair.getFluigNumber())
                                                .items(
                                                        repair.getItems().stream()
                                                                .map(
                                                                        item ->
                                                                                LogisticItemResponse.ItemResponse.builder()
                                                                                        .id(item.getId())
                                                                                        .request(repair.getRequest())
                                                                                        .material(item.getMaterial())
                                                                                        .description(item.getDescription())
                                                                                        .quantity(item.getQuantity())
                                                                                        .unitPrice(item.getUnitValue())
                                                                                        .totalPrice(item.getTotalValue())
                                                                                        .dimensions(item.getDimensions())
                                                                                        .shippingDate(item.getReceiptDate())
                                                                                        .label(item.getLabel())
                                                                                        .logisticItemStatus(
                                                                                                getLogisticItemStatus(item).getValue())
                                                                                        .build())
                                                                .toList())
                                                .build())
                        .toList());
    }

    private String getLogisticStatusBySubItems(Repair repair) {
        if (repair.getItems().stream()
                .flatMap(item -> item.getSubItems().stream())
                .filter(subItem -> subItem.getStatus().contains(SubItemStatusName.LOGISTICS))
                .allMatch(
                        subItem -> subItem.getLogisticAssigned() != null && subItem.getLogisticAssigned())) {
            return "completed";
        }

        return "none";
    }

    private LogisticItemStatus getLogisticItemStatus(Item item) {
        if (item.getLogisticAssigned() != null && item.getLogisticAssigned()) {
            return LogisticItemStatus.ASSIGNED;
        }

        return LogisticItemStatus.NONE;
    }

    private LogisticItemStatus getLogisticSubItemStatus(SubItem subItem) {
        if (subItem.getLogisticAssigned() != null && subItem.getLogisticAssigned()) {
            return LogisticItemStatus.ASSIGNED;
        }

        return LogisticItemStatus.NONE;
    }
}
