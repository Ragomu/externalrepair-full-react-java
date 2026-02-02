package br.com.uisa.externalrepair.adapter.in.web.controller.fiscal;

import br.com.uisa.externalrepair.adapter.in.web.dto.FiscalCompleteRepairResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/complete-fiscal-items")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FiscalCompleteItemListController {

    private final RepairRepository repairRepository;

    @GetMapping("/{nf}")
    public ResponseEntity<FiscalCompleteRepairResponse> getCompleteFiscalRepair(
            @PathVariable String nf) {

        FiscalCompleteRepairResponse response =
                repairRepository.findAllByNf(nf).stream()
                        .map(
                                repair ->
                                        FiscalCompleteRepairResponse.builder()
                                                .nf(repair.getNf())
                                                .returnNf(repair.getReturnNf())
                                                .status(
                                                        repair
                                                                        .getStatus()
                                                                        .getName()
                                                                        .name()
                                                                        .equals(StatusName.ANALISE_FISCAL.name())
                                                                ? "finished"
                                                                : "unfinished")
                                                .fluigNumber(repair.getFluigNumber())
                                                .items(
                                                        repair.getItems().stream()
                                                                .map(
                                                                        item ->
                                                                                FiscalCompleteRepairResponse.ItemResponse.builder()
                                                                                        .id(item.getId())
                                                                                        .request(repair.getRequest())
                                                                                        .material(item.getMaterial())
                                                                                        .description(item.getDescription())
                                                                                        .quantity(item.getReceivedQuantity())
                                                                                        .unitPrice(item.getUnitValue())
                                                                                        .totalPrice(
                                                                                                NumberFormat.getCurrencyInstance(
                                                                                                                Locale.of("pt", "BR"))
                                                                                                        .format(item.getTotalValue()))
                                                                                        .dimensions(item.getDimensions())
                                                                                        .label(item.getLabel())
                                                                                        .date(item.getReceiptDate())
                                                                                        .build())
                                                                .toList())
                                                .build())
                        .findAny()
                        .orElse(FiscalCompleteRepairResponse.builder().nf(nf).items(List.of()).build());

        log.info("Fetching complete fiscal repair for NF: {}", nf);

        return ResponseEntity.ok(response);
    }
}
