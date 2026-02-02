package br.com.uisa.externalrepair.adapter.in.web.api;

import br.com.uisa.externalrepair.adapter.in.web.dto.CreateRepairRequest;
import br.com.uisa.externalrepair.application.util.Constants;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = Constants.CREATE_REPAIR_TAG, description = Constants.CREATE_REPAIR_DESCRIPTION)
public interface CreateRepairApi {

    @ApiResponses(
            value = {
                @ApiResponse(
                        responseCode = "204",
                        description = "Solicitação inicial realizada com sucesso"),
                @ApiResponse(
                        responseCode = "400",
                        description = "Erro devido a sintaxe incorreta ou falta de informações")
            })
    ResponseEntity<Void> handleCreateRepair(CreateRepairRequest request, MultipartFile pdf);
}
