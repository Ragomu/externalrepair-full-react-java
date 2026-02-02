package br.com.uisa.externalrepair.adapter.in.web.controller;

import br.com.uisa.externalrepair.adapter.in.web.api.CreateRepairApi;
import br.com.uisa.externalrepair.adapter.in.web.dto.CreateRepairRequest;
import br.com.uisa.externalrepair.application.port.in.CreateRepairUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/create-repair")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CreateRepairController implements CreateRepairApi {

    private final CreateRepairUseCase useCase = null;

    @PostMapping(consumes = {"multipart/form-data"})
    @Override
    public ResponseEntity<Void> handleCreateRepair(
            @Valid @RequestPart CreateRepairRequest request, @RequestPart MultipartFile pdf) {
        log.info(
                "{} {}", "Recebendo requisição para solicitação inicial com número:", request.request());

        useCase.handleCreateRepair(request, pdf);

        log.info(
                "{} {}",
                "Requisição para solicitação inicial realizada com sucesso com número:",
                request.request());
        return ResponseEntity.noContent().build();
    }
}
