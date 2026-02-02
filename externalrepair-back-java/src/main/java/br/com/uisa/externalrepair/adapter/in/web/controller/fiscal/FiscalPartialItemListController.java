package br.com.uisa.externalrepair.adapter.in.web.controller.fiscal;

import br.com.uisa.externalrepair.adapter.in.web.dto.FiscalPartialRepairResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.application.domain.model.DestinyItem;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/partial-fiscal-items")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FiscalPartialItemListController {

    private final ItemRepository itemRepository;

    @GetMapping("/{nf}")
    public ResponseEntity<FiscalPartialRepairResponse> getPartialFiscalItemList(
            @PathVariable String nf) {
        List<Item> items = itemRepository.findAllByRepairNf(nf);

        FiscalPartialRepairResponse response =
                FiscalPartialRepairResponse.builder()
                        .nf(nf)
                        .fluigNumber(items.getFirst().getRepair().getFluigNumber())
                        .items(
                                items.stream()
                                        .filter(
                                                item ->
                                                        item.getSubItems().stream()
                                                                        .anyMatch(
                                                                                subItem ->
                                                                                        subItem.getDestinyItem() != null
                                                                                                && subItem
                                                                                                        .getDestinyItem()
                                                                                                        .equals(DestinyItem.RETURN))
                                                                || item.getSubItems().stream()
                                                                        .anyMatch(
                                                                                subItem ->
                                                                                        subItem.getDestinyItem() != null
                                                                                                && subItem
                                                                                                        .getDestinyItem()
                                                                                                        .equals(DestinyItem.IRREPARABLE)))
                                        .map(
                                                item ->
                                                        FiscalPartialRepairResponse.ItemResponse.builder()
                                                                .id(item.getId())
                                                                .material(item.getMaterial())
                                                                .quantity(item.getQuantity())
                                                                .description(item.getDescription())
                                                                .unitPrice(item.getUnitValue())
                                                                .totalPrice(item.getTotalValue())
                                                                .dimensions(item.getDimensions())
                                                                .date(item.getReceiptDate())
                                                                .subItems(
                                                                        item.getSubItems().stream()
                                                                                .filter(
                                                                                        subItem ->
                                                                                                subItem
                                                                                                        .getStatus()
                                                                                                        .contains(SubItemStatusName.FISCAL))
                                                                                .filter(subItem -> subItem.getFiscalApproved() == null)
                                                                                .map(
                                                                                        subItem ->
                                                                                                FiscalPartialRepairResponse.SubItemResponse
                                                                                                        .builder()
                                                                                                        .id(subItem.getId())
                                                                                                        .returnNfNumber(subItem.getReturnNfNumber())
                                                                                                        .returnQuantity(subItem.getReturnQuantity())
                                                                                                        .returnDate(subItem.getReturnNfDate())
                                                                                                        .material(item.getMaterial())
                                                                                                        .description(item.getDescription())
                                                                                                        .unitPrice(item.getUnitValue())
                                                                                                        .unitWeight(item.getUnitWeight())
                                                                                                        .dimensions(item.getDimensions())
                                                                                                        .subItemStatus(
                                                                                                                subItem.getSubItemStatus().getDescription())
                                                                                                        .subItemLabel(
                                                                                                                subItem.getSubItemLabel().getDescription())
                                                                                                        .build())
                                                                                .toList())
                                                                .build())
                                        .toList())
                        .build();

        return ResponseEntity.ok(response);
    }
}
