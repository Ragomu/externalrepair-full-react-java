package br.com.uisa.externalrepair.adapter.in.web.controller.receipt;

import br.com.uisa.externalrepair.adapter.in.web.api.ReceiptRepairListApi;
import br.com.uisa.externalrepair.adapter.in.web.dto.ReceiptRepairListStatus;
import br.com.uisa.externalrepair.adapter.in.web.dto.ReceiptRepairResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.config.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/received-nfs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReceiptRepairListController implements ReceiptRepairListApi {

    private final RepairRepository repairRepository;
    private final TokenProvider tokenProvider;

    @GetMapping("/{supplierDocument}")
    @Override
    public ResponseEntity<List<ReceiptRepairResponse>> getReceiptRepairList(
            @PathVariable String supplierDocument,
            @RequestParam(defaultValue = "all") String status,
            @RequestParam(required = false) String query,
            HttpServletRequest request) {
        List<StatusName> statusNames = getStatusNames(status);

        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        String isUisa = tokenProvider.getPayload(token, "isUisa");

        List<Repair> repairs;

        if (isUisa.equals("true")) {
            if (StringUtils.isNotEmpty(query)) {
                repairs = repairRepository.findAllByStatusIsAndNf(statusNames, query);
            } else {
                repairs = repairRepository.findAllByStatusIs(statusNames);
            }
        } else {
            if (StringUtils.isNotEmpty(query)) {
                repairs =
                        repairRepository.findAllBySupplierDocumentAndStatusIsAndNf(
                                supplierDocument, statusNames, query);
            } else {
                repairs =
                        repairRepository.findAllBySupplierDocumentAndStatusIs(supplierDocument, statusNames);
            }
        }

        List<ReceiptRepairResponse> response =
                repairs.stream()
                        .map(
                                repair ->
                                        ReceiptRepairResponse.builder()
                                                .nf(repair.getNf())
                                                .emissionDate(repair.getDepartureDateUisa())
                                                .issuer("Usinas Itamarati S/A")
                                                .receiver(repair.getSupplier().getName())
                                                .totalQuantity(
                                                        repair.getItems().stream()
                                                                .map(Item::getOutputQuantity)
                                                                .reduce(0L, Long::sum)
                                                                .intValue())
                                                .status(
                                                        repair
                                                                        .getStatus()
                                                                        .getName()
                                                                        .name()
                                                                        .equals(StatusName.INICIO_REPARO.name())
                                                                ? "transit"
                                                                : "negotiation")
                                                .build())
                        .toList();
        return ResponseEntity.ok(response);
    }

    private static List<StatusName> getStatusNames(String status) {
        List<StatusName> statusNames = new ArrayList<>();

        if (status.equals(ReceiptRepairListStatus.ALL.value)) {
            statusNames = List.of(StatusName.INICIO_REPARO, StatusName.ENTRADA_RECEBIDA);
        } else if (status.equals(ReceiptRepairListStatus.NEGOTIATION.value)) {
            statusNames = List.of(StatusName.ENTRADA_RECEBIDA);
        } else if (status.equals(ReceiptRepairListStatus.TRANSIT.value)) {
            statusNames = List.of(StatusName.INICIO_REPARO);
        }
        return statusNames;
    }
}
