package br.com.uisa.externalrepair.adapter.in.web.controller.receipt;

import br.com.uisa.externalrepair.adapter.in.web.api.ReceiptEquipmentApi;
import br.com.uisa.externalrepair.application.port.in.ReceiptUseCase;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/flag-nf-receipt")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReceiptEquipmentController implements ReceiptEquipmentApi {

    private final ReceiptUseCase useCase;

    @PostMapping(
            path = "/{supplierDocument}/{nf}",
            consumes = {"multipart/form-data"})
    @Override
    public ResponseEntity<Void> handleReceiptEquipment(
            @PathVariable String supplierDocument,
            @PathVariable String nf,
            @RequestPart List<MultipartFile> equipmentImages) {
        log.info("{} {}", "Recebendo requisição de recebimento de equipamento com número:", nf);

        useCase.handleReceiptEquipment(supplierDocument, nf, equipmentImages);

        log.info(
                "{} {}", "Requisição de recebimento de equipamento realizada com sucesso com número:", nf);
        return ResponseEntity.noContent().build();
    }
}
