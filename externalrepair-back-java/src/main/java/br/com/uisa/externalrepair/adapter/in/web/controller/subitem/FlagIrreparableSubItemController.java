package br.com.uisa.externalrepair.adapter.in.web.controller.subitem;

import br.com.uisa.externalrepair.adapter.in.web.dto.FlagIrreparableSubItemRequest;
import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.DestinyItem;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.MaintenanceType;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import br.com.uisa.externalrepair.application.domain.model.SubItemLabel;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatus;
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
@RestController()
@RequestMapping("/flag-irreparable-sub-item")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FlagIrreparableSubItemController {

    private final SubItemRepository subItemRepository;
    private final RepairRepository repairRepository;
    private final ItemRepository itemRepository;

    private final RepairHistoryService repairHistoryService;

    @PostMapping("/{supplierDocument}/{nf}")
    @Transactional
    public ResponseEntity<Void> flagIrreparableSubItem(
            @PathVariable String supplierDocument,
            @PathVariable String nf,
            @RequestBody FlagIrreparableSubItemRequest request) {
        repairRepository.updateByMaintenanceType(
                supplierDocument, nf, MaintenanceType.PARTIAL.getValue());

        Item item = itemRepository.findById(request.itemId()).orElse(null);

        SubItem subItem =
                SubItem.builder()
                        .item(item)
                        .irreparableQuantity(request.quantity())
                        .subItemLabel(SubItemLabel.WAITING_APPROVAL)
                        .subItemStatus(SubItemStatus.IRREPARABLE)
                        .destinyItem(DestinyItem.fromValue(request.destinyItem()))
                        .status(new ArrayList<>(List.of(SubItemStatusName.COUNTERPARTY)))
                        .build();

        subItemRepository.save(subItem);

        itemRepository.updateByItemStatus(
                request.itemId(), nf, supplierDocument, ItemStatus.INITIALIZED.getStatus());

        Repair repair =
                repairRepository.findAllBySupplierDocumentAndNf(supplierDocument, nf).stream()
                        .findFirst()
                        .orElseThrow();

        repairHistoryService.registerStatusChange(
                repair,
                "Manutenção",
                "Manutenção sinalizada. "
                        + repair.getItems().stream().map(Item::getOutputQuantity).reduce(0L, Long::sum)
                        + " itens enviados | "
                        + repair.getItems().stream().map(Item::getReceivedQuantity).reduce(0L, Long::sum)
                        + " itens recebidos");

        return ResponseEntity.ok().build();
    }
}
