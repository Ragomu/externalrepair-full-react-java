package br.com.uisa.externalrepair.adapter.in.web.controller.counterparty;

import br.com.uisa.externalrepair.adapter.in.web.dto.CounterpartyActionRequest;
import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemDetailRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import br.com.uisa.externalrepair.application.domain.model.SubItemAction;
import br.com.uisa.externalrepair.application.domain.model.SubItemDetail;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import br.com.uisa.externalrepair.application.service.RepairHistoryService;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/counterparty-action")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CounterpartyActionController {

    private final SubItemRepository subItemRepository;
    private final SubItemDetailRepository subItemDetailRepository;

    private final RepairHistoryService repairHistoryService;

    @PostMapping("/{nf}/{subItemId}")
    public ResponseEntity<Void> handleCounterpartyAction(
            @PathVariable String nf,
            @PathVariable Long subItemId,
            @RequestBody CounterpartyActionRequest request) {

        SubItem subItem = subItemRepository.findById(subItemId).orElse(null);

        SubItemDetail subItemDetail =
                SubItemDetail.builder()
                        .subItem(subItem)
                        .quantity(request.quantity())
                        .action(SubItemAction.fromValue(request.action()))
                        .build();
        subItemDetailRepository.save(subItemDetail);

        subItemRepository.updateByCounterpartyItemStatus(
                subItemId, nf, ItemStatus.INITIALIZED.getStatus());

        List<SubItemStatusName> status = subItem.getStatus();
        status.add(SubItemStatusName.TECHNICAL_MANAGER);
        subItem.setStatus(status);

        repairHistoryService.registerStatusChange(
                subItem.getItem().getRepair(),
                "Contraparte",
                "Ação registrada na contraparte para o Sub-Item com ID: "
                        + subItemId
                        + " com ação: "
                        + request.action()
                        + " e quantidade: "
                        + request.quantity());

        return ResponseEntity.ok().build();
    }
}
