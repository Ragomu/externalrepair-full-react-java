package br.com.uisa.externalrepair.adapter.in.web.controller.maintenance;

import br.com.uisa.externalrepair.adapter.in.web.dto.MaintenanceRepairTypeResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.MaintenanceType;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.config.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController()
@RequestMapping("/maintenance-nf-type")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MaintenanceRepairTypeController {

    private final RepairRepository repairRepository;

    private final TokenProvider tokenProvider;

    @GetMapping("/{supplierDocument}/{nf}")
    public MaintenanceRepairTypeResponse getMaintenanceRepairType(
            @PathVariable String supplierDocument, @PathVariable String nf, HttpServletRequest request) {
        log.info("Fetching maintenance repair status for supplier: {}, NF: {}", supplierDocument, nf);

        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        String isUisa = tokenProvider.getPayload(token, "isUisa");

        List<Repair> repairs;

        if (isUisa.equals("true")) {
            repairs = repairRepository.findAllByNf(nf);
        } else {
            repairs = repairRepository.findAllBySupplierDocumentAndNf(supplierDocument, nf);
        }

        return repairs.stream()
                .map(
                        repair ->
                                MaintenanceRepairTypeResponse.builder()
                                        .type(
                                                repair.getMaintenanceType() == null
                                                        ? MaintenanceType.NONE.getValue()
                                                        : repair.getMaintenanceType())
                                        .build())
                .findFirst()
                .orElse(
                        MaintenanceRepairTypeResponse.builder().type(MaintenanceType.NONE.getValue()).build());
    }
}
