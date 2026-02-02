package br.com.uisa.externalrepair.adapter.in.web.controller.fiscal;

import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.service.RepairHistoryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/fiscal-approve-complete-nf")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FiscalApproveCompleteNfController {

    private final RepairRepository repairRepository;

    private final RepairHistoryService repairHistoryService;

    @PostMapping("/{nf}")
    @Transactional
    public ResponseEntity<Void> approveCompleteNf(@PathVariable String nf) {
        log.info("Approving complete NF for NF: {}", nf);
        repairRepository.updateByStatus(nf, StatusName.ANALISE_FISCAL);

        repairHistoryService.registerStatusChange(
                repairRepository.findAllByNf(nf).getFirst(), "Fiscal", "Nota fiscal aprovada.");

        return ResponseEntity.ok().build();
    }
}
