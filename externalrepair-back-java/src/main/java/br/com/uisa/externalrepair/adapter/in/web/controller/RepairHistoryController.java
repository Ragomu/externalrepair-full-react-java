package br.com.uisa.externalrepair.adapter.in.web.controller;

import br.com.uisa.externalrepair.adapter.in.web.dto.RepairHistoryResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairHistoryRepository;
import br.com.uisa.externalrepair.application.domain.model.RepairHistory;
import java.util.Collections;
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
@RestController
@RequestMapping("/repair-history")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RepairHistoryController {

    private final RepairHistoryRepository repairHistoryRepository;

    @GetMapping("/{nf}")
    public RepairHistoryResponse getRepairHistory(@PathVariable String nf) {
        List<RepairHistory> history = repairHistoryRepository.findAllByRepairNf(nf);
        Collections.reverse(history);

        return RepairHistoryResponse.builder()
                .nf(nf)
                .fluigNumber(history.getFirst().getRepair().getFluigNumber())
                .items(
                        history.stream()
                                .map(
                                        rh ->
                                                RepairHistoryResponse.ItemResponse.builder()
                                                        .status(rh.getStatus())
                                                        .description(rh.getDescription())
                                                        .date(rh.getDateTime())
                                                        .build())
                                .toList())
                .build();
    }
}
