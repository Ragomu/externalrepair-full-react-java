package br.com.uisa.externalrepair.adapter.in.web.controller.counterparty;

import br.com.uisa.externalrepair.adapter.in.web.dto.CounterpartyItemResponse;
import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.DestinyItem;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
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
@RequestMapping("/counterparty-items")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CounterpartyItemListController {

    private final ItemRepository itemRepository;
    private final SubItemRepository subItemRepository;

    @GetMapping("/{nf}")
    public ResponseEntity<CounterpartyItemResponse> getCounterpartyItemList(@PathVariable String nf) {
        List<SubItem> subItems = subItemRepository.findAllByRepairNf(nf);

        CounterpartyItemResponse response =
                CounterpartyItemResponse.builder()
                        .nf(nf)
                        .fluigNumber(
                                subItems.isEmpty()
                                        ? null
                                        : subItems.getFirst().getItem().getRepair().getFluigNumber())
                        .items(
                                subItems.stream()
                                        .filter(subItem -> subItem.getDestinyItem().equals(DestinyItem.IRREPARABLE))
                                        .filter(subItem -> subItem.getAction() == null)
                                        .map(
                                                subItem ->
                                                        CounterpartyItemResponse.ItemResponse.builder()
                                                                .nf(nf)
                                                                .id(subItem.getId())
                                                                .material(subItem.getItem().getMaterial())
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
                                                                .itemStatus(
                                                                        subItem.getCounterpartyItemStatus() == null
                                                                                ? ItemStatus.NONE.getStatus()
                                                                                : subItem.getCounterpartyItemStatus())
                                                                .subItems(
                                                                        subItem.getSubItemDetails().stream()
                                                                                .map(
                                                                                        subItemDetail ->
                                                                                                CounterpartyItemResponse.SubItemResponse.builder()
                                                                                                        .subItemAction(
                                                                                                                subItemDetail.getAction().getDescription())
                                                                                                        .id(subItemDetail.getId())
                                                                                                        .quantity(subItemDetail.getQuantity())
                                                                                                        .material(subItem.getItem().getMaterial())
                                                                                                        .description(subItem.getItem().getDescription())
                                                                                                        .unitPrice(subItem.getItem().getUnitValue())
                                                                                                        .unitWeight(subItem.getItem().getUnitWeight())
                                                                                                        .dimensions(subItem.getItem().getDimensions())
                                                                                                        .label(subItem.getItem().getLabel())
                                                                                                        .build())
                                                                                .toList())
                                                                .build())
                                        .toList())
                        .build();

        return ResponseEntity.ok(response);
    }
}
