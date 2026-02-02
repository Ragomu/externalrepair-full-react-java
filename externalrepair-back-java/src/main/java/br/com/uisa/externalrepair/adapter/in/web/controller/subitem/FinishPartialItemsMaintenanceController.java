package br.com.uisa.externalrepair.adapter.in.web.controller.subitem;

import br.com.uisa.externalrepair.adapter.in.web.dto.FinishPartialItemsMaintenanceRequest;
import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import jakarta.transaction.Transactional;
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
@RestController()
@RequestMapping("/finish-partial-items-maintenance")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FinishPartialItemsMaintenanceController {

    private final ItemRepository itemRepository;
    private final RepairRepository repairRepository;
    private final SubItemRepository subItemRepository;

    @PostMapping("/{supplierDocument}/{nf}")
    @Transactional
    public ResponseEntity<Void> finishPartialItemsMaintenance(
            @PathVariable String supplierDocument,
            @PathVariable String nf,
            @RequestBody FinishPartialItemsMaintenanceRequest request) {
        itemRepository.updateByRepairNfAndSupplierDocumentAndAllSubItemsAssigned(
                request.id(), nf, supplierDocument, true);
        itemRepository.updateByItemStatus(
                request.id(), nf, supplierDocument, ItemStatus.FINISHED.getStatus());

        List<Item> items = itemRepository.findBySupplierDocumentAndNf(supplierDocument, nf);

        //        items.forEach(
        //                item ->
        //                        item.getSubItems()
        //                                .forEach(
        //                                        subItem -> {
        //                                            List<SubItemStatusName> status =
        // subItem.getStatus() == null
        //                                                    ? new ArrayList<>()
        //                                                    : subItem.getStatus();
        //
        // status.addAll(List.of(SubItemStatusName.MAINTENANCE, SubItemStatusName.FISCAL,
        // SubItemStatusName.COUNTERPARTY));
        //                                            subItem.setStatus(status);

        //                                            subItem.setStatus(
        //                                                    new ArrayList<>(
        //                                                            List.of(
        //
        // SubItemStatusName.MAINTENANCE,
        //                                                                    SubItemStatusName.FISCAL,
        //
        // SubItemStatusName.COUNTERPARTY)));
        //                                            subItemRepository.save(subItem);
        //                                        }));

        boolean allItemsFinished =
                items.stream()
                        .allMatch(
                                item ->
                                        item.getItemStatus() != null
                                                && item.getItemStatus().equals(ItemStatus.FINISHED.getStatus()));

        if (allItemsFinished) {
            repairRepository.updateByStatus(nf, StatusName.ANDAMENTO_REPARO);
        }
        return ResponseEntity.ok().build();
    }
}
