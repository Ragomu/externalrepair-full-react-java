package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.SubItem;
import br.com.uisa.externalrepair.application.domain.model.SubItemLabel;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface SubItemRepository extends JpaRepository<SubItem, Long> {

    @Query("SELECT s FROM SubItem s WHERE s.item.repair.nf = :nf")
    List<SubItem> findAllByRepairNf(String nf);

    @Transactional
    @Modifying
    @Query(
            "UPDATE SubItem s SET s.fiscalApproved = TRUE, s.subItemLabel = :subItemLabel WHERE s.id = :id AND s.item.id = :itemId AND s.item.repair.nf = :nf")
    void updateByFiscalApproved(Long id, Long itemId, String nf, SubItemLabel subItemLabel);

    @Transactional
    @Modifying
    @Query(
            "UPDATE SubItem s SET s.fiscalApproved = FALSE, s.justification = :justification, s.subItemLabel = :subItemLabel WHERE s.id = :id AND s.item.id = :itemId AND s.item.repair.nf = :nf")
    void updateByFiscalApprovedAndJustification(
            Long id, Long itemId, String nf, SubItemLabel subItemLabel, String justification);

    @Transactional
    @Modifying
    @Query(
            "UPDATE SubItem s SET s.subItemLabel = :subItemLabel WHERE s.id = :id AND s.item.repair.nf = :nf")
    void updateBySubItemLabel(Long id, String nf, SubItemLabel subItemLabel);

    @Transactional
    @Modifying
    @Query(
            "UPDATE SubItem s SET s.returnNfDate = :returnNfDate, s.returnNfNumber = :returnNfNumber, s.returnQuantity = :returnQuantity WHERE s.id = :id AND s.item.repair.supplier.document = :supplierDocument AND s.item.repair.nf = :nf")
    void updateByReturnNfDateAndReturnNfNumberAndReturnQuantity(
            Long id,
            String supplierDocument,
            String nf,
            LocalDate returnNfDate,
            String returnNfNumber,
            Long returnQuantity);

    @Transactional
    @Modifying
    @Query(
            "UPDATE SubItem s SET s.counterpartyItemStatus = :counterpartyItemStatus WHERE s.id = :id AND s.item.repair.nf = :nf")
    void updateByCounterpartyItemStatus(Long id, String nf, String counterpartyItemStatus);

    @Transactional
    @Modifying
    @Query(
            "UPDATE SubItem i SET i.fleet = :fleet, i.observation = :observation, i.carrier = :carrier, i.contact = :contact, i.plate = :plate, i.logisticAssigned = true WHERE i.id = :id AND i.item.repair.nf = :nf")
    void updateByLogisticExternal(
            @Param("id") Long id,
            @Param("nf") String nf,
            @Param("fleet") String fleet,
            @Param("observation") String observation,
            @Param("carrier") String carrier,
            @Param("contact") String contact,
            @Param("plate") String plate);

    @Transactional
    @Modifying
    @Query(
            "UPDATE SubItem i SET i.fleet = :fleet, i.driver = :driver, i.plate = :plate, i.observation = :observation, i.logisticAssigned = true WHERE i.id = :id AND i.item.repair.nf = :nf")
    void updateByLogisticUisa(
            @Param("id") Long id,
            @Param("nf") String nf,
            @Param("fleet") String fleet,
            @Param("driver") String driver,
            @Param("plate") String plate,
            @Param("observation") String observation);

    @Transactional
    @Modifying
    @Query(
            "UPDATE SubItem i SET i.warehouseReceivedQuantity = :warehouseReceivedQuantity, i.warehouseReceiptDate = :warehouseReceiptDate WHERE i.item.repair.nf = :nf AND i.id = :itemId")
    void updateSubItemsWarehouseReceivedQuantityAndWarehouseReceiptDate(
            @Param("nf") String nf,
            @Param("warehouseReceivedQuantity") Integer warehouseReceivedQuantity,
            @Param("warehouseReceiptDate") LocalDate warehouseReceiptDate,
            @Param("itemId") Long itemId);

    @Transactional
    @Modifying
    @Query(
            "UPDATE SubItem i SET i.warehouseReceived = TRUE WHERE i.item.repair.nf = :nf AND i.id = :id")
    void updateByWarehouseReceived(@Param("nf") String nf, @Param("id") Long id);
}
