package br.com.uisa.externalrepair.adapter.in.web.controller.subitem;

import br.com.uisa.externalrepair.adapter.in.web.dto.ItemStatus;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController()
@RequestMapping("/delete-sub-item")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DeleteSubItemController {

    private final SubItemRepository subItemRepository;
    private final ItemRepository itemRepository;

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteSubItem(@PathVariable Long id) {
        SubItem subItem = subItemRepository.findById(id).orElse(null);

        Item item = subItem.getItem();
        item.setItemStatus(ItemStatus.INITIALIZED.getStatus());
        itemRepository.save(item);

        subItemRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
