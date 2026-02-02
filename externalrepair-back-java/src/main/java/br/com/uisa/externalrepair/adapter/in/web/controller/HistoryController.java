package br.com.uisa.externalrepair.adapter.in.web.controller;

import br.com.uisa.externalrepair.adapter.in.web.dto.HistoryItemResponse;
import br.com.uisa.externalrepair.adapter.in.web.dto.HistoryResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.config.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HistoryController {

    private final RepairRepository repairRepository;
    private final TokenProvider tokenProvider;

    @GetMapping("/{supplierDocument}")
    @Transactional
    public ResponseEntity<HistoryResponse> history(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "status", defaultValue = "all") String status,
            @RequestParam(value = "query", required = false) String query,
            @PathVariable(value = "supplierDocument") String supplierDocument,
            HttpServletRequest request) {
        log.info("Recebendo requisição para listar histórico");

        Boolean isUisa = tokenProvider.isUisaToken(request);

        Sort sort = Sort.by(Sort.Direction.DESC, "departureDateUisa");
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Repair> repairs;

        if (Boolean.TRUE.equals(isUisa)) {
            if (StringUtils.isNotEmpty(query)) {
                if (status.equals("incomplete")) {
                    repairs =
                            repairRepository.findAllByStatusIsIncompleteAndNf(
                                    StatusName.INTEGRACAO_BPM, query, pageable);
                } else if (status.equals("complete")) {
                    repairs =
                            repairRepository.findAllByStatusIsCompleteAndNf(
                                    StatusName.FINALIZADO, query, pageable);
                } else {
                    repairs = repairRepository.findAllByNf(query, pageable);
                }
            } else if (status.equals("incomplete")) {
                repairs = repairRepository.findAllByStatusIsIncomplete(StatusName.INTEGRACAO_BPM, pageable);
            } else if (status.equals("complete")) {
                repairs = repairRepository.findAllByStatusIsComplete(StatusName.FINALIZADO, pageable);
            } else {
                repairs = repairRepository.findAll(pageable);
            }
        } else {
            if (StringUtils.isNotEmpty(query)) {
                if (status.equals("incomplete")) {
                    repairs =
                            repairRepository.findAllBySupplierDocumentAndStatusIsIncompleteAndNf(
                                    supplierDocument, StatusName.INTEGRACAO_BPM, query, pageable);
                } else if (status.equals("complete")) {
                    repairs =
                            repairRepository.findAllBySupplierDocumentAndStatusIsCompleteAndNf(
                                    supplierDocument, StatusName.FINALIZADO, query, pageable);
                } else {
                    repairs =
                            repairRepository.findAllBySupplierDocumentAndNf(supplierDocument, query, pageable);
                }
            } else if (status.equals("incomplete")) {
                repairs =
                        repairRepository.findAllBySupplierDocumentAndStatusIsIncomplete(
                                supplierDocument, StatusName.INTEGRACAO_BPM, pageable);
            } else if (status.equals("complete")) {
                repairs =
                        repairRepository.findAllBySupplierDocumentAndStatusIsComplete(
                                supplierDocument, StatusName.FINALIZADO, pageable);
            } else {
                repairs = repairRepository.findAllBySupplierDocument(supplierDocument, pageable);
            }
        }

        List<HistoryItemResponse> historyItemResponse =
                repairs.getContent().stream()
                        .map(
                                repair ->
                                        HistoryItemResponse.builder()
                                                .nf(repair.getNf())
                                                .emissionDate(repair.getDepartureDateUisa())
                                                .issuer("Usinas Itamarati S/A")
                                                .receiver(repair.getSupplier().getName())
                                                .totalValue(
                                                        repair.getItems().stream()
                                                                .map(Item::getTotalValue)
                                                                .reduce(0.0, Double::sum))
                                                .status(
                                                        !repair.getStatus().getName().equals(StatusName.FINALIZADO)
                                                                ? "Incompleto"
                                                                : "Finalizado")
                                                .build())
                        .toList();

        HistoryResponse historyResponse =
                HistoryResponse.builder()
                        .items(historyItemResponse)
                        .totalPages(repairs.getTotalPages())
                        .totalItems(repairs.getTotalElements())
                        .currentPage(repairs.getNumber())
                        .build();

        log.info("Requisição para listar histórico concluída com sucesso");
        return ResponseEntity.ok(historyResponse);
    }
}
