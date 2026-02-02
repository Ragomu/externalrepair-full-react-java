package br.com.uisa.externalrepair.adapter.in.web.api;

import br.com.uisa.externalrepair.adapter.in.web.dto.ReceiptRepairResponse;
import br.com.uisa.externalrepair.application.util.Constants;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(
        name = Constants.RECEIPT_REPAIR_LIST_TAG,
        description = Constants.RECEIPT_REPAIR_LIST_DESCRIPTION)
public interface ReceiptRepairListApi {

    @ApiResponses(
            value = {
                @ApiResponse(
                        responseCode = "200",
                        description = "Lista de reparos recebidos retornada com sucesso"),
                @ApiResponse(
                        responseCode = "400",
                        description = "Erro devido a sintaxe incorreta ou falta de informações"),
                @ApiResponse(responseCode = "500", description = "Erro na aplicação desconhecido")
            })
    ResponseEntity<List<ReceiptRepairResponse>> getReceiptRepairList(
            @Parameter(
                            name = "supplierDocument",
                            description = "Documento do fornecedor (CNPJ)",
                            example = "06088847000156",
                            required = true,
                            in = ParameterIn.PATH)
                    @PathVariable(value = "supplierDocument")
                    String supplierDocument,
            String status,
            String query,
            @Parameter(hidden = true) HttpServletRequest request);
}
