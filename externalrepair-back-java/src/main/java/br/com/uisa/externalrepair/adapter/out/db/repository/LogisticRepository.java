package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.Logistic;
import br.com.uisa.externalrepair.application.domain.model.LogisticName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogisticRepository extends JpaRepository<Logistic, LogisticName> {
    Logistic findByName(LogisticName name);
}
