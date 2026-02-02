package br.com.uisa.externalrepair.application.service;

import br.com.uisa.externalrepair.adapter.out.db.repository.RepairHistoryRepository;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.RepairHistory;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RepairHistoryService {

    private final RepairHistoryRepository repairHistoryRepository;

    public void registerStatusChange(Repair repair, String status, String description) {
        RepairHistory repairHistory = new RepairHistory();
        repairHistory.setRepair(repair);
        repairHistory.setStatus(status);
        repairHistory.setDescription(description);
        repairHistory.setDate(LocalDate.now());
        repairHistory.setDateTime(LocalDateTime.now());
        repairHistoryRepository.save(repairHistory);
    }
}
