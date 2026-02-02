package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.Warehouse;
import br.com.uisa.externalrepair.application.domain.model.WarehouseName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseRepository extends JpaRepository<Warehouse, WarehouseName> {
    Warehouse findByName(WarehouseName name);
}
