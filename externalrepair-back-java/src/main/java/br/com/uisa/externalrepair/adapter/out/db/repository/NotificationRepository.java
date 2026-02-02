package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.Notification;
import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByCreatedAtGreaterThan(Instant startDate);

    List<Notification> findAllBySupplierDocumentAndCreatedAtGreaterThan(
            String supplierDocument, Instant startDate);
}
