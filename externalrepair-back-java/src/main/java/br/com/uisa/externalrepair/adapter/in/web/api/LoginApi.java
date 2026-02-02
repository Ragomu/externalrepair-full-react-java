package br.com.uisa.externalrepair.adapter.in.web.api;

import br.com.uisa.externalrepair.adapter.in.web.dto.LoginRequest;
import br.com.uisa.externalrepair.adapter.in.web.dto.LoginResponse;
import br.com.uisa.externalrepair.application.util.Constants;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.security.NoSuchAlgorithmException;
import org.springframework.http.ResponseEntity;

@Tag(name = Constants.LOGIN_TAG, description = Constants.LOGIN_DESCRIPTION)
public interface LoginApi {

    @ApiResponses(
            value = {
                @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
                @ApiResponse(responseCode = "403", description = "Credenciais inválidas"),
            })
    ResponseEntity<LoginResponse> login(LoginRequest request)
            throws NoSuchAlgorithmException, JsonProcessingException;
}
