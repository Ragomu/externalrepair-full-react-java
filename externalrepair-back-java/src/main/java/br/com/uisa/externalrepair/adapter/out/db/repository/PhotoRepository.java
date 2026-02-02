package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Modifying
    @Query(
            "UPDATE Photo p SET p.repair = (SELECT r FROM Repair r WHERE r.nf = :nf) WHERE p.id = :photoId")
    void updateByRepair(@Param("photoId") Long photoId, @Param("nf") String nf);
}
