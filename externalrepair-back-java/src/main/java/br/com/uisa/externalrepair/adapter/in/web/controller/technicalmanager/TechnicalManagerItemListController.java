package br.com.uisa.externalrepair.adapter.in.web.controller.technicalmanager;

import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.in.web.dto.TechnicalManagerItemResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.DestinyItem;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import br.com.uisa.externalrepair.application.domain.model.SubItemAction;
import br.com.uisa.externalrepair.application.domain.model.SubItemLabel;
import java.util.List;
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
@RestController()
@RequestMapping("/technical-manager-items")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TechnicalManagerItemListController {

    private final SubItemRepository subItemRepository;

    @GetMapping("/{nf}")
    public ResponseEntity<TechnicalManagerItemResponse> getTechnicalManagerItemList(
            @PathVariable String nf) {
        List<SubItem> subItems = subItemRepository.findAllByRepairNf(nf);

        TechnicalManagerItemResponse response =
                TechnicalManagerItemResponse.builder()
                        .nf(nf)
                        .fluigNumber(
                                subItems.isEmpty()
                                        ? null
                                        : subItems.getFirst().getItem().getRepair().getFluigNumber())
                        .items(
                                subItems.stream()
                                        .filter(
                                                subItem ->
                                                        subItem.getDestinyItem().equals(DestinyItem.IRREPARABLE)
                                                                && (subItem.getSubItemDetails().stream()
                                                                        .anyMatch(
                                                                                subItemDetail ->
                                                                                        subItemDetail.getAction().equals(SubItemAction.DISCARD)
                                                                                                || subItemDetail
                                                                                                        .getAction()
                                                                                                        .equals(SubItemAction.SELL)
                                                                                                || subItemDetail
                                                                                                        .getAction()
                                                                                                        .equals(SubItemAction.RETURN))))
                                        //                                        .filter(subItem ->
                                        //
                                        // subItem.getSubItemDetails().stream().noneMatch(subItemDetail ->
                                        // subItemDetail.getSubItemLabel() != null &&
                                        // (subItemDetail.getSubItemLabel().equals(SubItemLabel.IRREPARABLE_SELL)
                                        //                                                ||
                                        // subItemDetail.getSubItemLabel().equals(SubItemLabel.IRREPARABLE_RETURN)
                                        //                                                        ||
                                        // subItemDetail.getSubItemLabel().equals(SubItemLabel.IRREPARABLE_DISCARD))))
                                        .map(
                                                subItem ->
                                                        TechnicalManagerItemResponse.ItemResponse.builder()
                                                                .nf(nf)
                                                                .id(subItem.getId())
                                                                .material(subItem.getItem().getMaterial())
                                                                .itemStatus(
                                                                        subItem.getTechnicalManagerItemStatus() == null
                                                                                ? ItemStatus.NONE.getStatus()
                                                                                : subItem.getTechnicalManagerItemStatus())
                                                                .description(subItem.getItem().getDescription())
                                                                .sent(subItem.getItem().getReceivedQuantity())
                                                                .irreparable(
                                                                        subItem.getIrreparableQuantity() == null
                                                                                ? 0L
                                                                                : subItem.getIrreparableQuantity())
                                                                .unitValue(subItem.getItem().getUnitValue())
                                                                .totalValue(subItem.getItem().getTotalValue())
                                                                .unitWeight(subItem.getItem().getUnitWeight())
                                                                .dimensions(subItem.getItem().getDimensions())
                                                                .date(subItem.getItem().getReceiptDate())
                                                                .subItems(
                                                                        subItem.getSubItemDetails().stream()
                                                                                .filter(
                                                                                        subItemDetail ->
                                                                                                subItemDetail
                                                                                                                .getAction()
                                                                                                                .equals(SubItemAction.DISCARD)
                                                                                                        || subItemDetail
                                                                                                                .getAction()
                                                                                                                .equals(SubItemAction.SELL)
                                                                                                        || subItemDetail
                                                                                                                .getAction()
                                                                                                                .equals(SubItemAction.RETURN))
                                                                                .filter(
                                                                                        subItemDetail ->
                                                                                                subItemDetail.getSubItemLabel() == null)
                                                                                .map(
                                                                                        si ->
                                                                                                TechnicalManagerItemResponse.SubItemResponse
                                                                                                        .builder()
                                                                                                        .id(si.getId())
                                                                                                        .subItemAction(si.getAction().getDescription())
                                                                                                        .quantity(si.getQuantity())
                                                                                                        .material(
                                                                                                                si.getSubItem().getItem().getMaterial())
                                                                                                        .description(
                                                                                                                si.getSubItem().getItem().getDescription())
                                                                                                        .unitPrice(
                                                                                                                si.getSubItem().getItem().getUnitValue())
                                                                                                        .unitWeight(
                                                                                                                si.getSubItem().getItem().getUnitWeight())
                                                                                                        .dimensions(
                                                                                                                si.getSubItem().getItem().getDimensions())
                                                                                                        .label(si.getSubItem().getItem().getLabel())
                                                                                                        .date(
                                                                                                                si.getSubItem().getItem().getReceiptDate())
                                                                                                        .sent(
                                                                                                                si.getSubItem()
                                                                                                                        .getItem()
                                                                                                                        .getReceivedQuantity())
                                                                                                        .irreparable(
                                                                                                                si.getSubItem().getIrreparableQuantity()
                                                                                                                                == null
                                                                                                                        ? 0L
                                                                                                                        : si.getSubItem()
                                                                                                                                .getIrreparableQuantity())
                                                                                                        .technicalManagerStatus(
                                                                                                                si.getSubItemLabel() != null
                                                                                                                                && (si.getSubItemLabel()
                                                                                                                                                .equals(
                                                                                                                                                        SubItemLabel
                                                                                                                                                                .IRREPARABLE_DISCARD)
                                                                                                                                        || si.getSubItemLabel()
                                                                                                                                                .equals(
                                                                                                                                                        SubItemLabel
                                                                                                                                                                .IRREPARABLE_RETURN)
                                                                                                                                        || si.getSubItemLabel()
                                                                                                                                                .equals(
                                                                                                                                                        SubItemLabel
                                                                                                                                                                .IRREPARABLE_SELL))
                                                                                                                        ? "approved"
                                                                                                                        : "none")
                                                                                                        .build())
                                                                                .toList())
                                                                .build())
                                        .toList())
                        .build();

        return ResponseEntity.ok(response);
    }
}
