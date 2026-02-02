package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.AdditionalNf;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdditionalNfRepository extends JpaRepository<AdditionalNf, Long> {
    @Query("SELECT a FROM AdditionalNf a WHERE a.repair.nf = :nf")
    List<AdditionalNf> findAllByRepairNf(@Param("nf") String nf);
}
