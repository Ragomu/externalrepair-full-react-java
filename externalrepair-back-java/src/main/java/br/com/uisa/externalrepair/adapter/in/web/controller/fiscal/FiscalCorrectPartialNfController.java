package br.com.uisa.externalrepair.adapter.in.web.controller.fiscal;

import br.com.uisa.externalrepair.adapter.in.web.dto.FiscalCorrectPartialNfRequest;
import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemMaintenanceRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.SubItemLabel;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import br.com.uisa.externalrepair.application.service.RepairHistoryService;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/fiscal-correct-partial-nf")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FiscalCorrectPartialNfController {

    private final SubItemRepository subItemRepository;
    private final SubItemMaintenanceRepository subItemMaintenanceRepository;
    private final RepairRepository repairRepository;

    private final RepairHistoryService repairHistoryService;

    @PostMapping("/{nf}/{itemId}/{subItemId}")
    @Transactional
    public ResponseEntity<Void> correctPartialNf(
            @PathVariable String nf,
            @PathVariable Long itemId,
            @PathVariable Long subItemId,
            @RequestBody FiscalCorrectPartialNfRequest request) {

        subItemRepository.updateByFiscalApprovedAndJustification(
                subItemId, itemId, nf, SubItemLabel.REPROVED, request.justification());
        subItemRepository.updateBySubItemLabel(subItemId, nf, SubItemLabel.REPROVED);

        subItemRepository
                .findById(subItemId)
                .ifPresent(
                        subItem -> {
                            List<SubItemStatusName> status = subItem.getStatus();
                            status.add(SubItemStatusName.MAINTENANCE);
                            subItem.setStatus(status);
                        });

        subItemMaintenanceRepository.updateByJustificationAndReturnNfNumber(
                request.justification(), request.returnNfNumber(), subItemId, itemId, nf);

        repairHistoryService.registerStatusChange(
                repairRepository.findAllByNf(nf).getFirst(), "Fiscal", "Nota fiscal reprovada.");

        subItemRepository
                .findById(subItemId)
                .ifPresent(
                        subItem -> {
                            Item item = subItem.getItem();
                            item.setItemStatus(ItemStatus.INITIALIZED.getStatus());
                        });

        return ResponseEntity.ok().build();
    }
}
