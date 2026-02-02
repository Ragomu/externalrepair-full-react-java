package br.com.uisa.externalrepair.adapter.in.web.controller.counterparty;

import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
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
@RequestMapping("/counterparty-finish-item")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CounterpartyFinishItemController {

    private final SubItemRepository subItemRepository;

    @PostMapping("/{itemId}")
    public ResponseEntity<Void> finishItem(@PathVariable Long itemId) {
        subItemRepository
                .findById(itemId)
                .ifPresent(
                        subItem -> {
                            //                            List<SubItemStatusName> status = subItem.getStatus();
                            //                            status.add(SubItemStatusName.TECHNICAL_MANAGER);
                            //                            subItem.setStatus(status);

                            subItem.setCounterpartyItemStatus(ItemStatus.FINISHED.getStatus());
                            //                            subItem.setStatus(
                            //                                    new ArrayList<>(
                            //                                            List.of(
                            //                                                    SubItemStatusName.MAINTENANCE,
                            //                                                    SubItemStatusName.COUNTERPARTY,
                            //
                            // SubItemStatusName.TECHNICAL_MANAGER)));
                            subItemRepository.save(subItem);
                        });

        return ResponseEntity.ok().build();
    }
}
