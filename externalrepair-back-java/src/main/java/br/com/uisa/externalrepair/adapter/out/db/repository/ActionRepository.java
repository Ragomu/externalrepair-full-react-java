package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.Action;
import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActionRepository extends JpaRepository<Action, Long> {
    List<Action> findAllByCreatedAtGreaterThan(Instant startDate);

    List<Action> findAllBySupplierDocumentAndCreatedAtGreaterThan(
            String supplierDocument, Instant startDate);
}
