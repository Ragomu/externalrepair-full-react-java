package br.com.uisa.externalrepair.adapter.in.web.controller;

import br.com.uisa.externalrepair.adapter.in.web.dto.AssignUserRequest;
import br.com.uisa.externalrepair.adapter.out.db.repository.PersonRepository;
import br.com.uisa.externalrepair.application.domain.model.Person;
import br.com.uisa.externalrepair.application.domain.model.PersonType;
import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/assign-user")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AssignUserController {

    private final PersonRepository personRepository;

    @PostMapping
    public ResponseEntity<Void> assignUser(@Valid @RequestBody AssignUserRequest request) {
        List<PersonType> personTypes = new ArrayList<>();

        request.types().stream().map(PersonType::valueOf).forEach(personTypes::add);

        Person person = Person.builder().email(request.email()).personTypes(personTypes).build();

        personRepository
                .findByEmail(person.getEmail())
                .ifPresentOrElse(
                        existingPerson -> {
                            existingPerson.setPersonTypes(person.getPersonTypes());
                            personRepository.save(existingPerson);
                        },
                        () -> {
                            personRepository.save(person);
                        });

        return ResponseEntity.noContent().build();
    }
}
