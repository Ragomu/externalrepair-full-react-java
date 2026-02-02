package br.com.uisa.externalrepair.adapter.in.web.controller.receipt;

import br.com.uisa.externalrepair.adapter.in.web.api.ReceiptItemListApi;
import br.com.uisa.externalrepair.adapter.in.web.dto.ReceiptItemResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.config.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
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
@RestController
@RequestMapping("/received-items")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReceiptItemListController implements ReceiptItemListApi {

    private final RepairRepository repairRepository;
    private final TokenProvider tokenProvider;

    @GetMapping("/{supplierDocument}/{nf}")
    @Override
    public ResponseEntity<ReceiptItemResponse> getReceiptItemList(
            @PathVariable String supplierDocument, @PathVariable String nf, HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        String isUisa = tokenProvider.getPayload(token, "isUisa");

        List<Repair> repairs;

        // Verifica se o usuário é UISA
        if (isUisa.equals("true")) {
            // Usuários UISA podem ver reparos apenas por NF, ignorando o supplierDocument
            log.info("Usuário UISA acessando itens de recebimento da NF: {}", nf);
            repairs = repairRepository.findAllByNf(nf);
        } else {
            // Fornecedores normais veem apenas seus próprios reparos
            log.info("Fornecedor acessando seus itens de recebimento da NF: {}", nf);
            repairs = repairRepository.findAllBySupplierDocumentAndNf(supplierDocument, nf);
        }

        ReceiptItemResponse response =
                repairs.stream()
                        .map(
                                repair ->
                                        ReceiptItemResponse.builder()
                                                .nf(repair.getNf())
                                                .fluigNumber(repair.getFluigNumber())
                                                .items(
                                                        repair.getItems().stream()
                                                                .map(
                                                                        item ->
                                                                                ReceiptItemResponse.ItemResponse.builder()
                                                                                        .id(item.getId())
                                                                                        .request(repair.getRequest())
                                                                                        .material(item.getMaterial())
                                                                                        .description(item.getDescription())
                                                                                        .quantity(item.getOutputQuantity())
                                                                                        .unitPrice(item.getUnitValue())
                                                                                        .totalPrice(item.getTotalValue())
                                                                                        .received(item.getReceived())
                                                                                        .subject(item.getSubject())
                                                                                        .shippingDate(repair.getDepartureDateUisa())
                                                                                        .build())
                                                                .toList())
                                                .build())
                        .findAny()
                        .orElse(ReceiptItemResponse.builder().nf(nf).items(List.of()).build());

        return ResponseEntity.ok(response);
    }
}
