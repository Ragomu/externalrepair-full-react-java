package br.com.uisa.externalrepair.adapter.in.web.controller.warehouse;

import br.com.uisa.externalrepair.adapter.in.web.dto.WarehouseItemRequest;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.MaintenanceType;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import br.com.uisa.externalrepair.application.service.RepairHistoryService;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/flag-item-receipt-warehouse")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WarehouseItemController {

    private final ItemRepository itemRepository;
    private final RepairRepository repairRepository;
    private final SubItemRepository subItemRepository;

    private final RepairHistoryService repairHistoryService;

    @PostMapping(path = "/{nf}")
    @Transactional
    public ResponseEntity<Void> handleReceiptItemWarehouse(
            @PathVariable String nf, @RequestBody WarehouseItemRequest request) {
        Repair repair = repairRepository.findAllByNf(nf).getFirst();

        if (repair.getMaintenanceType().equals(MaintenanceType.PARTIAL.getValue())) {

            updateWarehouseBySubItem(request, nf);
            List<SubItem> subItems = subItemRepository.findAllByRepairNf(nf);

            // Ajuste: definir corretamente a sequência de status e persistir o subItem (antes limpava a
            // lista e não salvava)
            //            subItems.stream()
            //                    .filter(subItem -> subItem.getId().equals(request.id()))
            //                    .forEach(subItem -> subItem.setStatus(new ArrayList<>()));
            //            subItems.stream()
            //                    .filter(subItem -> subItem.getId().equals(request.id()))
            //                    .forEach(
            //                            subItem -> {
            //                                subItem.setStatus(
            //                                        new ArrayList<>(
            //                                                List.of(
            //                                                        SubItemStatusName.MAINTENANCE,
            //                                                        SubItemStatusName.FISCAL,
            //                                                        SubItemStatusName.LOGISTICS,
            //                                                        SubItemStatusName.WAREHOUSE)));
            //                                subItemRepository.save(subItem);
            //                            });
            boolean allSubItemsWarehouseReceived =
                    subItems.stream()
                            .allMatch(
                                    subItem ->
                                            subItem.getWarehouseReceived() != null && subItem.getWarehouseReceived());

            //            if (allSubItemsWarehouseReceived) {
            //                repairRepository.updateByStatus(nf, StatusName.FINALIZADO);
            //            }
        } else {
            updateWarehouseByItem(request, nf);

            List<Item> items = itemRepository.findAllByRepairNf(nf);

            items.forEach(
                    item ->
                            item.getSubItems().stream()
                                    .filter(subItem -> subItem.getId().equals(request.id()))
                                    .forEach(
                                            subItem -> {
                                                subItem.setStatus(
                                                        new ArrayList<>(
                                                                List.of(
                                                                        SubItemStatusName.MAINTENANCE,
                                                                        SubItemStatusName.FISCAL,
                                                                        SubItemStatusName.LOGISTICS,
                                                                        SubItemStatusName.WAREHOUSE)));
                                                subItemRepository.save(subItem);
                                            }));

            boolean allItemsWarehouseReceived =
                    items.stream()
                            .allMatch(item -> item.getWarehouseReceived() != null && item.getWarehouseReceived());

            if (allItemsWarehouseReceived) {
                repairRepository.updateByStatus(nf, StatusName.FINALIZADO);
            }
        }

        return ResponseEntity.ok().build();
    }

    private void updateWarehouseByItem(WarehouseItemRequest request, String nf) {
        itemRepository.updateItemsWarehouseReceivedQuantityAndWarehouseReceiptDate(
                nf, request.receivedQuantity(), request.receiptDate(), request.id());
        itemRepository.updateByWarehouseReceived(nf, request.id());

        repairHistoryService.registerStatusChange(
                repairRepository.findAllByNf(nf).getFirst(),
                "Almoxarifado",
                "Recebimento sinalizado de " + request.receivedQuantity() + " itens.");
    }

    private void updateWarehouseBySubItem(WarehouseItemRequest request, String nf) {
        subItemRepository.updateSubItemsWarehouseReceivedQuantityAndWarehouseReceiptDate(
                nf, request.receivedQuantity(), request.receiptDate(), request.id());
        subItemRepository.updateByWarehouseReceived(nf, request.id());

        repairHistoryService.registerStatusChange(
                repairRepository.findAllByNf(nf).getFirst(),
                "Almoxarifado",
                "Recebimento sinalizado de " + request.receivedQuantity() + " itens.");
    }
}
