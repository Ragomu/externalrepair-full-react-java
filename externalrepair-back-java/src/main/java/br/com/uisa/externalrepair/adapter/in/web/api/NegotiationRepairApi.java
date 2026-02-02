package br.com.uisa.externalrepair.adapter.in.web.api;

import br.com.uisa.externalrepair.adapter.in.web.dto.NegotiationRepairRequest;
import br.com.uisa.externalrepair.application.util.Constants;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(
        name = Constants.NEGOTIATION_REPAIR_TAG,
        description = Constants.NEGOTIATION_REPAIR_DESCRIPTION)
public interface NegotiationRepairApi {

    @ApiResponses(
            value = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Negociação de reparo realizada com sucesso"),
                @ApiResponse(
                        responseCode = "400",
                        description = "Erro devido a sintaxe incorreta ou falta de informações"),
            })
    ResponseEntity<Void> handleNegotiationRepairResponse(NegotiationRepairRequest request);
}
