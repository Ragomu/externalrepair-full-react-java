package br.com.uisa.externalrepair.adapter.in.web.controller.fiscal;

import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/fiscal-approve-partial-nf")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FiscalApprovePartialNfController {

    private final SubItemRepository subItemRepository;
    private final ItemRepository itemRepository;
    private final RepairRepository repairRepository;
    private final RepairHistoryService repairHistoryService;

    @PostMapping("/{nf}/{itemId}/{subItemId}")
    @Transactional
    public ResponseEntity<Void> approvePartialNf(
            @PathVariable String nf, @PathVariable Long itemId, @PathVariable Long subItemId) {

        subItemRepository.updateByFiscalApproved(subItemId, itemId, nf, SubItemLabel.APPROVED);

        List<Item> items = itemRepository.findAllByRepairNf(nf);

        subItemRepository
                .findById(subItemId)
                .ifPresent(
                        subItem -> {
                            List<SubItemStatusName> status = subItem.getStatus();
                            status.add(SubItemStatusName.LOGISTICS);
                            subItem.setStatus(status);

                            subItemRepository.save(subItem);
                        });

        //        items.forEach(
        //                item ->
        //                        item.getSubItems().stream()
        //                                .filter(subItem -> subItem.getId().equals(subItemId))
        //                                .forEach(
        //                                        subItem -> {
        //                                            List<SubItemStatusName> status =
        // subItem.getStatus();
        //                                            status.add(SubItemStatusName.LOGISTICS);
        //                                            subItem.setStatus(status);

        //                                            subItem.setStatus(
        //                                                    new ArrayList<>(
        //                                                            List.of(
        //
        // SubItemStatusName.MAINTENANCE,
        //                                                                    SubItemStatusName.FISCAL,
        //
        // SubItemStatusName.LOGISTICS)));
        //                                            subItemRepository.save(subItem);
        //                                        }));

        boolean allSubItemsApproved =
                items.stream()
                        .allMatch(
                                item -> {
                                    List<SubItem> subs = item.getSubItems();
                                    if (subs == null || subs.isEmpty()) {
                                        return false;
                                    }
                                    return subs.stream().allMatch(s -> Boolean.TRUE.equals(s.getFiscalApproved()));
                                });
        if (allSubItemsApproved) {
            repairRepository.updateByStatus(nf, StatusName.ANALISE_FISCAL);
        }

        repairHistoryService.registerStatusChange(
                repairRepository.findAllByNf(nf).getFirst(),
                "Fiscal",
                "Nota fiscal aprovada com número: " + nf);

        return ResponseEntity.ok().build();
    }
}
