package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.RepairHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RepairHistoryRepository extends JpaRepository<RepairHistory, Long> {

    @Query("SELECT rh FROM RepairHistory rh WHERE rh.repair.nf = :nf ORDER BY rh.dateTime DESC")
    List<RepairHistory> findAllByRepairNf(String nf);
}
