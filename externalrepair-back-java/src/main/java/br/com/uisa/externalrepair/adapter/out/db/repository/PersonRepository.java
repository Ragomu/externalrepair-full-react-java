package br.com.uisa.externalrepair.adapter.out.db.repository;

import br.com.uisa.externalrepair.application.domain.model.Person;
import br.com.uisa.externalrepair.application.domain.model.PersonType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, String> {
    Optional<Person> findByEmail(String email);

    // Novo método para recuperar todos os usuários de um determinado perfil (ex: FISCAL)
    List<Person> findAllByPersonTypesContains(PersonType personType);
}
