package br.com.uisa.externalrepair.adapter.in.web.api;

import br.com.uisa.externalrepair.adapter.in.web.dto.ReceiptItemRequest;
import br.com.uisa.externalrepair.application.util.Constants;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestPart;

@Tag(name = Constants.RECEIPT_ITEM_TAG, description = Constants.RECEIPT_ITEM_DESCRIPTION)
public interface ReceiptItemApi {

    @ApiResponses(
            value = {
                @ApiResponse(
                        responseCode = "204",
                        description = "Solicitação de recebimento do ITEM realizada com sucesso"),
                @ApiResponse(
                        responseCode = "400",
                        description = "Erro devido a sintaxe incorreta ou falta de informações"),
                @ApiResponse(responseCode = "500", description = "Erro na aplicação desconhecido")
            })
    ResponseEntity<Void> handleReceiptItem(
            @Parameter(
                            name = "nf",
                            description = "Número da nota fiscal",
                            example = "00041697234",
                            required = true,
                            in = ParameterIn.PATH)
                    @PathVariable(value = "nf")
                    String nf,
            @Parameter(
                            name = "supplierDocument",
                            description = "Documento do fornecedor (CNPJ)",
                            example = "06088847000156",
                            required = true,
                            in = ParameterIn.PATH)
                    @PathVariable(value = "supplierDocument")
                    String supplierDocument,
            @Parameter(
                            name = "request",
                            description = "Dados do recebimento do ITEM",
                            required = true,
                            schema = @Schema(implementation = ReceiptItemRequest.class))
                    @RequestPart
                    ReceiptItemRequest request);
}
