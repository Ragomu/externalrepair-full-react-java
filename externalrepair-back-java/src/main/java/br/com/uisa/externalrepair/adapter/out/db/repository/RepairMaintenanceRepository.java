package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.RepairMaintenance;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface RepairMaintenanceRepository extends JpaRepository<RepairMaintenance, Long> {

    @Modifying
    @Query(
            "UPDATE RepairMaintenance rm SET rm.justification = :justification WHERE rm.repair.nf = :nf AND rm.returnNf = :returnNf")
    void updateByJustification(String nf, String justification, String returnNf);

    @Query(
            "SELECT rm FROM RepairMaintenance rm WHERE rm.repair.supplier.document = :supplierDocument AND rm.repair.nf = :nf")
    List<RepairMaintenance> findAllByRepairSupplierDocumentAndRepairNf(
            String supplierDocument, String nf);

    @Query("SELECT rm FROM RepairMaintenance rm WHERE rm.repair.nf = :nf")
    List<RepairMaintenance> findAllByRepairNf(String nf);
}
