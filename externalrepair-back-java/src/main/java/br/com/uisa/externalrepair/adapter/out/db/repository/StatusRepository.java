package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.Status;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, StatusName> {
    Status findByName(StatusName name);
}
