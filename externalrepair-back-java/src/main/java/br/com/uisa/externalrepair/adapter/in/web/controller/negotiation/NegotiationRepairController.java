package br.com.uisa.externalrepair.adapter.in.web.controller.negotiation;

import br.com.uisa.externalrepair.adapter.in.web.api.NegotiationRepairApi;
import br.com.uisa.externalrepair.adapter.in.web.dto.NegotiationRepairRequest;
import br.com.uisa.externalrepair.application.port.in.NegotiationRepairUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController()
@RequestMapping("/negotiation-ibid")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NegotiationRepairController implements NegotiationRepairApi {

    private final NegotiationRepairUseCase useCase;

    @PostMapping
    @Override
    public ResponseEntity<Void> handleNegotiationRepairResponse(
            @RequestBody NegotiationRepairRequest request) {
        log.info(
                "{} {}", "Recebendo requisição de resposta da negociação IBID com número:", request.nf());

        useCase.handleNegotiationRepairResponse(request);

        log.info(
                "{} {}",
                "Requisição de resposta da negociação IBID realizada com sucesso com número:",
                request.nf());
        return ResponseEntity.noContent().build();
    }
}
