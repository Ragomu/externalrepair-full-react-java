package br.com.uisa.externalrepair.adapter.in.web.controller.fiscal;

import br.com.uisa.externalrepair.adapter.in.web.dto.FiscalCorrectCompleteNfRequest;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairMaintenanceRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.service.RepairHistoryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/fiscal-correct-complete-nf")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FiscalCorrectCompleteNfController {

    private final RepairRepository repairRepository;
    private final RepairMaintenanceRepository repairMaintenanceRepository;

    private final RepairHistoryService repairHistoryService;

    @PostMapping("/{nf}")
    @Transactional
    public ResponseEntity<Void> correctCompleteNf(
            @PathVariable String nf, @RequestBody FiscalCorrectCompleteNfRequest request) {
        log.info("Correcting complete NF for NF: {}", nf);

        repairRepository.updateByCorrectionSentAndNf(nf, false);
        repairRepository.updateByJustification(nf, request.justification());

        repairMaintenanceRepository.updateByJustification(
                nf, request.justification(), request.returnNf());

        repairHistoryService.registerStatusChange(
                repairRepository.findAllByNf(nf).getFirst(), "Fiscal", "Nota fiscal reprovada.");

        return ResponseEntity.ok().build();
    }
}
