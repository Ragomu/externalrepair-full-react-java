package br.com.uisa.externalrepair.adapter.in.web.controller.counterparty;

import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemDetailRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/counter-party-delete-subitem")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CounterpartyDeleteSubItemController {

    private final SubItemDetailRepository subItemDetailRepository;
    private final SubItemRepository subItemRepository;

    @DeleteMapping("/{subItemDetailId}")
    public ResponseEntity<Void> deleteSubItemDetail(@PathVariable Long subItemDetailId) {
        subItemDetailRepository
                .findById(subItemDetailId)
                .ifPresent(
                        subItemDetail -> {
                            SubItem subItem = subItemDetail.getSubItem();
                            subItem.setCounterpartyItemStatus(ItemStatus.INITIALIZED.getStatus());
                            subItemRepository.save(subItem);

                            subItemDetailRepository.delete(subItemDetail);
                        });

        return ResponseEntity.ok().build();
    }
}
