package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface SupplierRepository extends JpaRepository<Supplier, String> {
    UserDetails findByEmail(String email);

    Boolean existsByDocumentAndEmail(String document, String email);
}
