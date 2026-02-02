package br.com.uisa.externalrepair.adapter.in.web.controller.subitem;

import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.in.web.dto.PartialMaintenanceSubItemsResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.application.domain.model.DestinyItem;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.SubItemLabel;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatus;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController()
@RequestMapping("/partial-maintenance-sub-items")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PartialMaintenanceSubItemsController {

    private final ItemRepository itemRepository;

    @GetMapping("/{supplierDocument}/{nf}")
    @Transactional
    public PartialMaintenanceSubItemsResponse getPartialMaintenanceSubItems(
            @PathVariable String supplierDocument, @PathVariable String nf) {

        List<Item> items = itemRepository.findBySupplierDocumentAndNf(supplierDocument, nf);

        return PartialMaintenanceSubItemsResponse.builder()
                .nf(nf)
                .items(
                        items.stream()
                                .filter(
                                        item ->
                                                item.getSubItems().isEmpty()
                                                        || item.getSubItems().stream()
                                                                .anyMatch(
                                                                        subItem ->
                                                                                !subItem.getSubItemLabel().equals(SubItemLabel.NONE)))
                                .map(
                                        item ->
                                                PartialMaintenanceSubItemsResponse.ItemResponse.builder()
                                                        .id(item.getId())
                                                        .material(item.getMaterial())
                                                        .quantity(item.getQuantity())
                                                        .description(item.getDescription())
                                                        .unitPrice(item.getUnitValue())
                                                        .totalPrice(item.getTotalValue())
                                                        .dimensions(item.getDimensions())
                                                        .date(item.getReceiptDate())
                                                        .itemStatus(
                                                                item.getItemStatus() == null
                                                                        ? ItemStatus.NONE.getStatus()
                                                                        : item.getItemStatus())
                                                        .subItems(
                                                                item.getSubItems().stream()
                                                                        .filter(
                                                                                subItem ->
                                                                                        subItem.getSubItemLabel() != null
                                                                                                && !subItem
                                                                                                        .getSubItemLabel()
                                                                                                        .equals(SubItemLabel.NONE))
                                                                        .map(
                                                                                subItem ->
                                                                                        PartialMaintenanceSubItemsResponse.SubItemResponse
                                                                                                .builder()
                                                                                                .id(subItem.getId())
                                                                                                .returnNfNumber(
                                                                                                        subItem
                                                                                                                        .getSubItemStatus()
                                                                                                                        .equals(SubItemStatus.IRREPARABLE)
                                                                                                                ? "0"
                                                                                                                : subItem.getReturnNfNumber())
                                                                                                .returnQuantity(
                                                                                                        subItem
                                                                                                                        .getSubItemStatus()
                                                                                                                        .equals(SubItemStatus.IRREPARABLE)
                                                                                                                ? subItem.getIrreparableQuantity()
                                                                                                                : subItem.getReturnQuantity())
                                                                                                .returnDate(
                                                                                                        subItem
                                                                                                                        .getSubItemStatus()
                                                                                                                        .equals(SubItemStatus.IRREPARABLE)
                                                                                                                ? item.getReceiptDate()
                                                                                                                : subItem.getReturnNfDate())
                                                                                                .material(item.getMaterial())
                                                                                                .description(item.getDescription())
                                                                                                .unitPrice(item.getUnitValue())
                                                                                                .unitWeight(item.getUnitWeight())
                                                                                                .dimensions(item.getDimensions())
                                                                                                .subItemStatus(
                                                                                                        subItem.getSubItemStatus() != null
                                                                                                                ? subItem
                                                                                                                        .getSubItemStatus()
                                                                                                                        .getDescription()
                                                                                                                : SubItemStatus.NONE.getDescription())
                                                                                                .subItemLabel(
                                                                                                        subItem.getSubItemLabel() != null
                                                                                                                ? subItem.getSubItemLabel().getDescription()
                                                                                                                : SubItemLabel.NONE.getDescription())
                                                                                                .destinyItem(
                                                                                                        subItem.getDestinyItem() != null
                                                                                                                ? subItem.getDestinyItem().getValue()
                                                                                                                : DestinyItem.NONE.getValue())
                                                                                                .sentNfs(
                                                                                                        subItem.getSubItemMaintenances().stream()
                                                                                                                .map(
                                                                                                                        subItemMaintenance ->
                                                                                                                                PartialMaintenanceSubItemsResponse
                                                                                                                                        .SentNf.builder()
                                                                                                                                        .returnNf(
                                                                                                                                                subItemMaintenance
                                                                                                                                                        .getReturnNfNumber())
                                                                                                                                        .justification(
                                                                                                                                                subItemMaintenance
                                                                                                                                                        .getJustification())
                                                                                                                                        .build())
                                                                                                                .toList())
                                                                                                .build())
                                                                        .toList())
                                                        .build())
                                .toList())
                .build();
    }
}
