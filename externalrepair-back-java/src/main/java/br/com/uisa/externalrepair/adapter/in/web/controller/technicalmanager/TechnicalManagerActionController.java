package br.com.uisa.externalrepair.adapter.in.web.controller.technicalmanager;

import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.in.web.dto.TechnicalManagerAction;
import br.com.uisa.externalrepair.adapter.in.web.dto.TechnicalManagerActionRequest;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemDetailRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.DestinyItem;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import br.com.uisa.externalrepair.application.domain.model.SubItemAction;
import br.com.uisa.externalrepair.application.domain.model.SubItemDetail;
import br.com.uisa.externalrepair.application.domain.model.SubItemLabel;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import br.com.uisa.externalrepair.application.service.RepairHistoryService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
@RequestMapping("/technical-manager-action")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TechnicalManagerActionController {

    private final SubItemDetailRepository subItemDetailRepository;
    private final SubItemRepository subItemRepository;
    private final ItemRepository itemRepository;

    private final RepairHistoryService repairHistoryService;

    @PostMapping("/{nf}/{subItemId}")
    public ResponseEntity<Void> handleTechnicalManagerAction(
            @PathVariable String nf,
            @PathVariable Long subItemId,
            @RequestBody TechnicalManagerActionRequest request) {
        subItemDetailRepository
                .findById(subItemId)
                .ifPresent(
                        subItemDetail -> {
                            SubItem subItem = subItemDetail.getSubItem();
                            subItem.setTechnicalManagerItemStatus(ItemStatus.INITIALIZED.getStatus());

                            if (request.action().equals(TechnicalManagerAction.REJECT.getAction())) {
                                subItemDetailRepository.delete(subItemDetail);
                            } else {
                                //                                List<SubItemStatusName> status =
                                // subItem.getStatus();
                                //                                status.add(SubItemStatusName.LOGISTICS);
                                //                                subItem.setStatus(status);

                                //                                subItem.setStatus(new
                                // ArrayList<>(List.of(SubItemStatusName.MAINTENANCE)));

                                //                                subItem.setStatus(
                                //                                        new ArrayList<>(
                                //                                                List.of(
                                //
                                // SubItemStatusName.MAINTENANCE,
                                //                                                        SubItemStatusName.FISCAL,
                                //
                                // SubItemStatusName.COUNTERPARTY,
                                //
                                // SubItemStatusName.TECHNICAL_MANAGER,
                                //
                                // SubItemStatusName.LOGISTICS)));

                                if (subItemDetail.getAction().equals(SubItemAction.RETURN)) {
                                    //
                                    // subItem.setSubItemLabel(SubItemLabel.IRREPARABLE_RETURN);
                                    subItemDetail.setSubItemLabel(SubItemLabel.IRREPARABLE_RETURN);
                                } else if (subItemDetail.getAction().equals(SubItemAction.DISCARD)) {
                                    //
                                    // subItem.setSubItemLabel(SubItemLabel.IRREPARABLE_DISCARD);
                                    subItemDetail.setSubItemLabel(SubItemLabel.IRREPARABLE_DISCARD);
                                } else if (subItemDetail.getAction().equals(SubItemAction.SELL)) {
                                    //
                                    // subItem.setSubItemLabel(SubItemLabel.IRREPARABLE_SELL);
                                    subItemDetail.setSubItemLabel(SubItemLabel.IRREPARABLE_SELL);
                                }

                                //                                Item newItem = createItemFromSubItem(subItem);
                                //                                itemRepository.save(newItem);

                                SubItem subItemFromSubItemDetail = createSubItemFromSubItemDetail(subItemDetail);
                                subItemFromSubItemDetail.setItem(subItem.getItem());
                                List<SubItemStatusName> status =
                                        new ArrayList<>(
                                                Optional.ofNullable(subItem.getStatus()).orElseGet(ArrayList::new));
                                if (!status.contains(SubItemStatusName.MAINTENANCE)) {
                                    status.add(SubItemStatusName.MAINTENANCE);
                                }
                                subItemFromSubItemDetail.setStatus(status);
                                subItemRepository.save(subItemFromSubItemDetail);
                            }

                            //                            itemRepository.updateByItemStatus(
                            //                                    subItem.getItem().getId(),
                            //                                    nf,
                            //
                            // subItem.getItem().getRepair().getSupplier().getDocument(),
                            //                                    ItemStatus.INITIALIZED.getStatus());

                            subItemRepository.save(subItem);

                            repairHistoryService.registerStatusChange(
                                    subItem.getItem().getRepair(),
                                    "Gerente Técnico",
                                    "Ação confirmada pelo gestor técnico para o Sub-Item com ID: "
                                            + subItemId
                                            + " com ação: "
                                            + request.action());
                        });

        return ResponseEntity.ok().build();
    }

    private Item createItemFromSubItem(SubItem originalSubItem) {
        Item newItem = new Item();

        Item originalItem = originalSubItem.getItem();

        Optional.ofNullable(originalItem.getMaterial()).ifPresent(newItem::setMaterial);
        Optional.ofNullable(originalItem.getDescription()).ifPresent(newItem::setDescription);
        Optional.ofNullable(originalItem.getQuantity()).ifPresent(newItem::setQuantity);
        Optional.ofNullable(originalItem.getUnitWeight()).ifPresent(newItem::setUnitWeight);
        Optional.ofNullable(originalItem.getOutputQuantity()).ifPresent(newItem::setOutputQuantity);
        Optional.ofNullable(originalItem.getLabel()).ifPresent(newItem::setLabel);
        Optional.ofNullable(originalItem.getDimensions()).ifPresent(newItem::setDimensions);
        Optional.ofNullable(originalItem.getUnitValue()).ifPresent(newItem::setUnitValue);
        Optional.ofNullable(originalItem.getTotalValue()).ifPresent(newItem::setTotalValue);
        Optional.ofNullable(originalItem.getSubject()).ifPresent(newItem::setSubject);

        Optional.ofNullable(originalItem.getReceivedQuantity()).ifPresent(newItem::setReceivedQuantity);
        Optional.ofNullable(originalItem.getReceiptDate()).ifPresent(newItem::setReceiptDate);
        Optional.ofNullable(originalItem.getReceived()).ifPresent(newItem::setReceived);
        Optional.ofNullable(originalItem.getRepair()).ifPresent(newItem::setRepair);

        List<SubItem> newSubItems =
                originalSubItem.getSubItemDetails().stream()
                        .map(this::createSubItemFromSubItemDetail)
                        .toList();

        newItem.setSubItems(newSubItems);

        newSubItems.forEach(subItem -> subItem.setItem(newItem));

        return newItem;
    }

    private SubItem createSubItemFromSubItemDetail(SubItemDetail subItemDetail) {
        SubItem newSubItem = new SubItem();

        newSubItem.setIrreparableQuantity(subItemDetail.getQuantity());
        newSubItem.setCounterpartyItemStatus(subItemDetail.getSubItem().getCounterpartyItemStatus());
        newSubItem.setTechnicalManagerItemStatus(
                subItemDetail.getSubItem().getTechnicalManagerItemStatus());

        newSubItem.setAction(subItemDetail.getAction());
        newSubItem.setSubItemLabel(subItemDetail.getSubItemLabel());
        newSubItem.setSubItemStatus(subItemDetail.getSubItem().getSubItemStatus());
        newSubItem.setDestinyItem(DestinyItem.IRREPARABLE);

        //        List<SubItemStatusName> status = subItemDetail.getSubItem().getStatus();
        //        status.add(SubItemStatusName.MAINTENANCE);
        //        newSubItem.setStatus(status);

        return newSubItem;
    }
}
