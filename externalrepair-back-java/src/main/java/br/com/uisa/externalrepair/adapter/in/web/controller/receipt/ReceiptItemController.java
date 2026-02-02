package br.com.uisa.externalrepair.adapter.in.web.controller.receipt;

import br.com.uisa.externalrepair.adapter.in.web.api.ReceiptItemApi;
import br.com.uisa.externalrepair.adapter.in.web.dto.ReceiptItemRequest;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
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
@RestController
@RequestMapping("/flag-item-receipt")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReceiptItemController implements ReceiptItemApi {

    private final ItemRepository itemRepository;

    @PostMapping(path = "/{supplierDocument}/{nf}")
    @Override
    public ResponseEntity<Void> handleReceiptItem(
            @PathVariable String supplierDocument,
            @PathVariable String nf,
            @RequestBody ReceiptItemRequest request) {
        itemRepository.updateItemsReceivedQuantityAndReceiptDateAAndReceived(
                nf,
                request.receivedQuantity(),
                request.receiptDate(),
                supplierDocument,
                request.id(),
                true);

        return ResponseEntity.ok().build();
    }
}
