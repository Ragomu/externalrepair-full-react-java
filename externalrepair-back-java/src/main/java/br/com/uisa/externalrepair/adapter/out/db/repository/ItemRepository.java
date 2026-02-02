package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.Item;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query("SELECT i FROM Item i JOIN i.repair r WHERE r.nf = :nf")
    List<Item> findAllByRepairNf(String nf);

    @Query(
            "SELECT i FROM Item i JOIN i.repair r WHERE r.supplier.document = :supplierDocument AND r.nf = :nf")
    List<Item> findBySupplierDocumentAndNf(
            @Param("supplierDocument") String supplierDocument, @Param("nf") String nf);

    @Transactional
    @Modifying
    @Query(
            "UPDATE Item i SET i.receivedQuantity = :receivedQuantity, i.receiptDate = :receiptDate, i.received = :received WHERE i.repair.nf = :nf AND i.repair.supplier.document = :supplierDocument AND i.id = :itemId")
    void updateItemsReceivedQuantityAndReceiptDateAAndReceived(
            @Param("nf") String nf,
            @Param("receivedQuantity") Integer receivedQuantity,
            @Param("receiptDate") LocalDate receiptDate,
            @Param("supplierDocument") String supplierDocument,
            @Param("itemId") Long itemId,
            @Param("received") Boolean received);

    @Transactional
    @Modifying
    @Query(
            "UPDATE Item i SET i.warehouseReceivedQuantity = :warehouseReceivedQuantity, i.warehouseReceiptDate = :warehouseReceiptDate WHERE i.repair.nf = :nf AND i.id = :itemId")
    void updateItemsWarehouseReceivedQuantityAndWarehouseReceiptDate(
            @Param("nf") String nf,
            @Param("warehouseReceivedQuantity") Integer warehouseReceivedQuantity,
            @Param("warehouseReceiptDate") LocalDate warehouseReceiptDate,
            @Param("itemId") Long itemId);

    @Transactional
    @Modifying
    @Query("UPDATE Item i SET i.warehouseReceived = TRUE WHERE i.repair.nf = :nf AND i.id = :id")
    void updateByWarehouseReceived(@Param("nf") String nf, @Param("id") Long id);

    @Transactional
    @Modifying
    @Query(
            "UPDATE Item i SET i.fleet = :fleet, i.observation = :observation, i.carrier = :carrier, i.contact = :contact, i.plate = :plate, i.logisticAssigned = true WHERE i.id = :id AND i.repair.nf = :nf")
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
            "UPDATE Item i SET i.fleet = :fleet, i.driver = :driver, i.plate = :plate, i.observation = :observation, i.logisticAssigned = true WHERE i.id = :id AND i.repair.nf = :nf")
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
            "UPDATE Item i SET i.allSubItemsAssigned = :allSubItemsAssigned WHERE i.id = :id AND i.repair.nf = :nf AND i.repair.supplier.document = :supplierDocument")
    void updateByRepairNfAndSupplierDocumentAndAllSubItemsAssigned(
            @Param("id") Long id,
            @Param("nf") String nf,
            @Param("supplierDocument") String supplierDocument,
            @Param("allSubItemsAssigned") Boolean allSubItemsAssigned);

    @Transactional
    @Modifying
    @Query(
            "UPDATE Item i SET i.itemStatus = :itemStatus WHERE i.id = :id AND i.repair.nf = :nf AND i.repair.supplier.document = :supplierDocument")
    void updateByItemStatus(
            @Param("id") Long id,
            @Param("nf") String nf,
            @Param("supplierDocument") String supplierDocument,
            @Param("itemStatus") String itemStatus);
}
