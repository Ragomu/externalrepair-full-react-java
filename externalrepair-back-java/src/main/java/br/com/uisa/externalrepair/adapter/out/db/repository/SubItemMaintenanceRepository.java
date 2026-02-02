package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.SubItemMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface SubItemMaintenanceRepository extends JpaRepository<SubItemMaintenance, Long> {

    @Transactional
    @Modifying
    @Query(
            "UPDATE SubItemMaintenance sim SET sim.justification = :justification "
                    + "WHERE sim.subItem.id = :subItemId AND sim.subItem.item.id = :itemId AND sim.subItem.item.repair.nf = :nf AND sim.returnNfNumber = :returnNfNumber")
    void updateByJustificationAndReturnNfNumber(
            String justification, String returnNfNumber, Long subItemId, Long itemId, String nf);
}
