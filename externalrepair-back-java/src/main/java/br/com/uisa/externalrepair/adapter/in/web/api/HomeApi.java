package br.com.uisa.externalrepair.adapter.in.web.api;

import br.com.uisa.externalrepair.adapter.in.web.dto.HomeResponse;
import br.com.uisa.externalrepair.application.util.Constants;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

@Tag(name = Constants.HOME_TAG, description = Constants.HOME_DESCRIPTION)
public interface HomeApi {

    @ApiResponses(
            value = {
                @ApiResponse(responseCode = "200", description = "Itens de reparo retornados com sucesso"),
                @ApiResponse(responseCode = "403", description = "Credenciais inválidas"),
            })
    ResponseEntity<HomeResponse> home(
            String supplierDocument,
            String maintenanceType,
            String transitType,
            String negotiationType,
            @Parameter(hidden = true) HttpServletRequest request);
}
