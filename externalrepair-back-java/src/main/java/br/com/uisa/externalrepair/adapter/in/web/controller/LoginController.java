package br.com.uisa.externalrepair.adapter.in.web.controller;

import br.com.uisa.externalrepair.adapter.in.web.api.LoginApi;
import br.com.uisa.externalrepair.adapter.in.web.dto.LoginRequest;
import br.com.uisa.externalrepair.adapter.in.web.dto.LoginResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.PersonRepository;
import br.com.uisa.externalrepair.adapter.out.web.client.AuthenticationClient;
import br.com.uisa.externalrepair.adapter.out.web.dto.AuthResponse;
import br.com.uisa.externalrepair.adapter.out.web.dto.UisaTokenPayload;
import br.com.uisa.externalrepair.application.domain.exception.UnauthorizedException;
import br.com.uisa.externalrepair.application.domain.model.Person;
import br.com.uisa.externalrepair.application.port.in.LoginUseCase;
import br.com.uisa.externalrepair.config.security.TokenProvider;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Base64;
import java.util.Optional;
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
@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoginController implements LoginApi {
    private final LoginUseCase useCase;
    private final AuthenticationClient authenticationClient;
    private final TokenProvider tokenProvider;
    private final PersonRepository personRepository;

    @PostMapping
    @Override
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request)
            throws JsonProcessingException {
        log.info(
                "mensagem {} solicitação {}", "Recebendo requisição para realizar login", request.email());

        if (request.email().endsWith("@uisa.com.br")) {
            log.info("Usuário UISA detectado: {}", request.email());
            AuthResponse authResponse = authenticationClient.login(request.email(), request.password());

            if (authResponse.message() != null) {
                throw new UnauthorizedException();
            }

            String[] chunks = authResponse.token().split("\\.");
            Base64.Decoder decoder = Base64.getUrlDecoder();

            String payload = new String(decoder.decode(chunks[1]));

            ObjectMapper mapper = new ObjectMapper();

            UisaTokenPayload tokenPayload = mapper.readValue(payload, UisaTokenPayload.class);

            Optional<Person> person = personRepository.findByEmail(tokenPayload.data().email());

            if (person.isEmpty()) {
                log.warn("Usuário não encontrado no banco de dados: {}", tokenPayload.data().email());
                throw new UnauthorizedException();
            }

            String token = tokenProvider.generateTokenUisa(tokenPayload, person.get().getPersonTypes());

            return ResponseEntity.ok(new LoginResponse(token));
        }

        LoginResponse response = useCase.login(request);

        log.info(
                "mensagem {} solicitação {}",
                "Requisição para realizar login realizada com sucesso",
                request.email());
        return ResponseEntity.ok(response);
    }
}
