package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RepairRepository extends JpaRepository<Repair, String> {
    @Transactional
    @Query("SELECT r FROM Repair r WHERE r.nf = :nf")
    List<Repair> findAllByNf(@Param("nf") String nf);

    @Transactional
    @Query(
            "SELECT r FROM Repair r LEFT JOIN r.items i LEFT JOIN i.subItems si WHERE r.nf = :nf AND :subItemStatusName MEMBER OF si.status")
    List<Repair> findAllByNfOrSubItemStatusNameIs(
            @Param("nf") String nf, @Param("subItemStatusName") SubItemStatusName subItemStatusName);

    @Transactional
    @Query(
            "SELECT r FROM Repair r LEFT JOIN r.items i LEFT JOIN i.subItems si WHERE r.nf = :nf AND (:subItemStatusName MEMBER OF si.status OR r.negotiationApproved = FALSE)")
    List<Repair> findAllByNfOrSubItemStatusNameIsAndNegotiationReproved(
            @Param("nf") String nf, @Param("subItemStatusName") SubItemStatusName subItemStatusName);

    @Transactional
    @Query("SELECT r FROM Repair r WHERE r.status.name = :statusName")
    List<Repair> findAllByStatusName(@Param("statusName") StatusName statusName);

    @Transactional
    @Query(
            "SELECT DISTINCT r FROM Repair r LEFT JOIN r.items i LEFT JOIN i.subItems si WHERE r.status.name = :statusName OR :subItemStatusName MEMBER OF si.status")
    List<Repair> findAllByStatusNameOrSubItemStatusNameIs(
            @Param("statusName") StatusName statusName, SubItemStatusName subItemStatusName);

    @Transactional
    @Query("SELECT r FROM Repair r WHERE r.status.name = :statusName AND r.nf LIKE %:nf%")
    List<Repair> findAllByStatusNameAndNf(StatusName statusName, String nf);

    @Transactional
    @Query(
            "SELECT r FROM Repair r JOIN r.items i JOIN i.subItems si WHERE r.nf = :nf AND (r.status.name = :statusName  OR :subItemStatusName MEMBER OF si.status)")
    List<Repair> findAllByStatusNameAndNfOrSubItemStatusNameIs(
            StatusName statusName, String nf, SubItemStatusName subItemStatusName);

    @Transactional
    @Query("SELECT r FROM Repair r JOIN r.supplier s WHERE s.document = :supplierDocument")
    Page<Repair> findAllBySupplierDocument(String supplierDocument, Pageable pageable);

    @Transactional
    @Query(
            "SELECT r FROM Repair r JOIN r.supplier s WHERE s.document = :supplierDocument AND r.status.name <> :statusName")
    Page<Repair> findAllBySupplierDocumentAndStatusIsIncomplete(
            String supplierDocument, StatusName statusName, Pageable pageable);

    @Transactional
    @Query(
            "SELECT r FROM Repair r JOIN r.supplier s WHERE s.document = :supplierDocument AND r.status.name <> :statusName AND r.nf = :nf")
    Page<Repair> findAllBySupplierDocumentAndStatusIsIncompleteAndNf(
            String supplierDocument, StatusName statusName, String nf, Pageable pageable);

    @Transactional
    @Query(
            "SELECT r FROM Repair r JOIN r.supplier s WHERE s.document = :supplierDocument AND r.status.name = :statusName AND r.nf = :nf")
    Page<Repair> findAllBySupplierDocumentAndStatusIsCompleteAndNf(
            String supplierDocument, StatusName statusName, String nf, Pageable pageable);

    @Transactional
    @Query(
            "SELECT r FROM Repair r JOIN r.supplier s WHERE s.document = :supplierDocument AND r.status.name = :statusName")
    Page<Repair> findAllBySupplierDocumentAndStatusIsComplete(
            String supplierDocument, StatusName statusName, Pageable pageable);

    @Transactional
    @Query(
            "SELECT r FROM Repair r JOIN r.supplier s WHERE s.document = :supplierDocument AND r.nf = :nf")
    Page<Repair> findAllBySupplierDocumentAndNf(
            String supplierDocument, String nf, Pageable pageable);

    @Query("SELECT r FROM Repair r WHERE r.supplier.document = :supplierDocument")
    List<Repair> findAllBySupplierDocument(String supplierDocument);

    @Query("SELECT r FROM Repair r WHERE r.departureDateUisa >= :startOfMonth")
    List<Repair> findAllByDepartureDateUisaIsGreaterThan(LocalDate startOfMonth);

    @Query(
            "SELECT r FROM Repair r WHERE r.supplier.document = :supplier_document AND r.departureDateUisa >= :startOfMonth")
    List<Repair> findAllBySupplierDocumentAndDepartureDateUisaIsGreaterThan(
            String supplier_document, LocalDate startOfMonth);

    @Query(
            "SELECT r FROM Repair r WHERE r.supplier.document = :supplier_document AND r.status.name IN :status")
    List<Repair> findAllBySupplierDocumentAndStatusIs(
            String supplier_document, List<StatusName> status);

    @Query(
            "SELECT DISTINCT r FROM Repair r LEFT JOIN r.items i LEFT JOIN i.subItems si WHERE r.supplier.document = :supplier_document AND (r.status.name IN :status OR :subItemStatusName MEMBER OF si.status)")
    List<Repair> findAllBySupplierDocumentAndStatusIsOrSubItemStatusNameIsMaintenance(
            String supplier_document, List<StatusName> status, SubItemStatusName subItemStatusName);

    @Query("SELECT r FROM Repair r WHERE r.status.name IN :status")
    List<Repair> findAllByStatusIs(List<StatusName> status);

    @Query(
            "SELECT DISTINCT r FROM Repair r LEFT JOIN r.items i LEFT JOIN i.subItems si WHERE r.status.name IN :status OR :subItemStatusName MEMBER OF si.status")
    List<Repair> findAllByStatusIsOrSubItemStatusNameIsMaintenance(
            List<StatusName> status, SubItemStatusName subItemStatusName);

    @Query(
            "SELECT r FROM Repair r WHERE r.supplier.document = :supplierDocument AND r.status.name IN :status AND r.nf LIKE %:nf%")
    List<Repair> findAllBySupplierDocumentAndStatusIsAndNf(
            String supplierDocument, List<StatusName> status, String nf);

    @Query(
            "SELECT r FROM Repair r JOIN r.items i JOIN i.subItems si WHERE r.supplier.document = :supplierDocument AND r.nf LIKE %:nf% AND (r.status.name IN :status OR :subItemStatusName MEMBER OF si.status)")
    List<Repair> findAllBySupplierDocumentAndStatusIsAndNfOrSubItemStatusNameIsMaintenance(
            String supplierDocument,
            List<StatusName> status,
            String nf,
            SubItemStatusName subItemStatusName);

    @Query("SELECT r FROM Repair r WHERE r.status.name IN :status AND r.nf LIKE %:nf%")
    List<Repair> findAllByStatusIsAndNf(List<StatusName> status, String nf);

    @Query(
            "SELECT r FROM Repair r JOIN r.items i JOIN i.subItems si WHERE r.nf LIKE %:nf% AND (r.status.name IN :status OR :subItemStatusName MEMBER OF si.status)")
    List<Repair> findAllByStatusIsAndNfOrSubItemStatusNameIsMaintenance(
            List<StatusName> status, String nf, SubItemStatusName subItemStatusName);

    @Query("SELECT r FROM Repair r WHERE r.supplier.document = :supplierDocument AND r.nf = :nf")
    List<Repair> findAllBySupplierDocumentAndNf(String supplierDocument, String nf);

    @Query(
            "SELECT r FROM Repair r WHERE r.nf = :nf AND r.maintenanceType = :maintenanceType AND r.status.name = :statusName")
    List<Repair> findAllByNfAndMaintenanceTypeAndStatusName(
            String nf, String maintenanceType, StatusName statusName);

    @Query(
            "SELECT DISTINCT r FROM Repair r JOIN r.items i JOIN i.subItems si WHERE (r.nf = :nf AND r.maintenanceType = :maintenanceType AND r.status.name = :statusName) OR :subItemStatusName MEMBER OF si.status")
    List<Repair> findAllByNfAndMaintenanceTypeAndStatusNameOrSubItemStatusNameIs(
            String nf,
            String maintenanceType,
            StatusName statusName,
            SubItemStatusName subItemStatusName);

    @Query(
            "SELECT r FROM Repair r WHERE r.nf = :nf AND r.maintenanceType = :maintenanceType AND r.departureDateUisa BETWEEN :startDate AND :endDate AND r.status.name = :statusName")
    List<Repair> findAllByNfAndMaintenanceTypeAndDateRangeAndStatusName(
            String nf, String maintenanceType, String startDate, String endDate, StatusName statusName);

    @Query(
            "SELECT DISTINCT r FROM Repair r JOIN r.items i JOIN i.subItems si WHERE (r.nf = :nf AND r.maintenanceType = :maintenanceType AND r.departureDateUisa BETWEEN :startDate AND :endDate AND r.status.name = :statusName) OR :subItemStatusName MEMBER OF si.status")
    List<Repair> findAllByNfAndMaintenanceTypeAndDateRangeAndStatusNameOrSubItemStatusNameIs(
            String nf,
            String maintenanceType,
            String startDate,
            String endDate,
            StatusName statusName,
            SubItemStatusName subItemStatusName);

    @Transactional
    @Query("SELECT r FROM Repair r WHERE r.status.name <> :statusName AND r.nf = :nf")
    Page<Repair> findAllByStatusIsIncompleteAndNf(
            StatusName statusName, String nf, Pageable pageable);

    @Transactional
    @Query("SELECT r FROM Repair r WHERE r.status.name = :statusName AND r.nf = :nf")
    Page<Repair> findAllByStatusIsCompleteAndNf(StatusName statusName, String nf, Pageable pageable);

    @Transactional
    @Query("SELECT r FROM Repair r WHERE r.nf = :nf")
    Page<Repair> findAllByNf(String nf, Pageable pageable);

    @Transactional
    @Query("SELECT r FROM Repair r WHERE r.status.name <> :statusName")
    Page<Repair> findAllByStatusIsIncomplete(StatusName statusName, Pageable pageable);

    @Transactional
    @Query("SELECT r FROM Repair r WHERE r.status.name = :statusName")
    Page<Repair> findAllByStatusIsComplete(StatusName statusName, Pageable pageable);

    @Transactional
    @Query(
            "SELECT r FROM Repair r JOIN r.items i JOIN i.subItems si WHERE :subItemStatusName MEMBER OF si.status")
    List<Repair> findAllBySubItemStatusNameIs(SubItemStatusName subItemStatusName);

    @Transactional
    @Query(
            "SELECT r FROM Repair r LEFT JOIN r.items i LEFT JOIN i.subItems si WHERE :subItemStatusName MEMBER OF si.status OR r.negotiationApproved = FALSE")
    List<Repair> findAllBySubItemStatusNameIsAndNegotiationReproved(
            SubItemStatusName subItemStatusName);

    @Modifying
    @Query(
            "UPDATE Repair r SET r.status = (SELECT s FROM Status s WHERE s.name = :statusName) WHERE r.nf = :nf")
    void updateByStatus(@Param("nf") String nf, @Param("statusName") StatusName statusName);

    @Modifying
    @Query(
            "UPDATE Repair r SET r.orderNumber = :orderNumber, r.negotiationApproved = TRUE, r.status = (SELECT s FROM Status s WHERE s.name = :statusName) WHERE r.nf = :nf AND r.supplier.document = :supplierDocument")
    void updateByOrderNumberAndStatusAndNegotiationApproved(
            @Param("nf") String nf,
            @Param("orderNumber") String orderNumber,
            @Param("statusName") StatusName statusName,
            @Param("supplierDocument") String supplierDocument);

    @Modifying
    @Query(
            "UPDATE Repair r SET r.negotiationApproved = FALSE WHERE r.nf = :nf AND r.supplier.document = :supplierDocument")
    void updateByNegotiationApproved(
            @Param("nf") String nf, @Param("supplierDocument") String supplierDocument);

    @Modifying
    @Query(
            "UPDATE Item i SET i.receivedQuantity = :receivedQuantity, i.receiptDate = :receiptDate WHERE i.repair.nf = :nf AND i.repair.supplier.document = :supplierDocument AND i.id = :itemId")
    void updateItemsReceivedQuantity(
            @Param("nf") String nf,
            @Param("receivedQuantity") Integer receivedQuantity,
            @Param("receiptDate") LocalDate receiptDate,
            @Param("supplierDocument") String supplierDocument,
            @Param("itemId") Long itemId);

    @Modifying
    @Query(
            "UPDATE Repair r SET r.photo = (SELECT p FROM Photo p WHERE p.id = :photoId), r.status = (SELECT s FROM Status s WHERE s.name = :statusName) WHERE r.request = :request")
    void updateByPhotoAndStatus(
            @Param("nf") String request,
            @Param("photoId") Long photoId,
            @Param("statusName") String statusName);

    @Modifying
    @Query(
            "UPDATE Repair r SET r.returnNf = :returnNumberNf, r.returnDate = :returnDate WHERE r.nf = :nf AND r.supplier.document = :supplierDocument")
    void updateByReturnNfAndReturnDate(
            @Param("supplierDocument") String supplierDocument,
            @Param("nf") String nf,
            @Param("returnNumberNf") String returnNumberNf,
            @Param("returnDate") LocalDate returnDate);

    @Modifying
    @Query(
            "UPDATE Repair r SET r.maintenanceType = :maintenanceType WHERE r.supplier.document = :supplierDocument AND r.nf = :nf")
    void updateByMaintenanceType(
            @Param("supplierDocument") String supplierDocument,
            @Param("nf") String nf,
            @Param("maintenanceType") String maintenanceType);

    @Modifying
    @Query("UPDATE Repair r SET r.justification = :justification, r.reproved = true WHERE r.nf = :nf")
    void updateByJustification(@Param("nf") String nf, @Param("justification") String justification);

    @Modifying
    @Query(
            "UPDATE Repair r SET r.correctionSent = :correctionSent WHERE r.supplier.document = :supplierDocument AND r.nf = :nf")
    void updateByCorrectionSent(
            @Param("supplierDocument") String supplierDocument,
            @Param("nf") String nf,
            @Param("correctionSent") Boolean correctionSent);

    @Modifying
    @Query("UPDATE Repair r SET r.correctionSent = :correctionSent WHERE r.nf = :nf")
    void updateByCorrectionSentAndNf(
            @Param("nf") String nf, @Param("correctionSent") Boolean correctionSent);
}
