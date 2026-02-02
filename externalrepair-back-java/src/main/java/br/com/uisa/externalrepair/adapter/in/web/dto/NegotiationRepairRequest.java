package br.com.uisa.externalrepair.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record NegotiationRepairRequest(
        @Schema(description = "NF-e", example = "000416972") @NotBlank String nf,
        @Schema(description = "CNPJ do fornecedor", example = "06088847000156") @NotBlank
                String document,
        @Schema(description = "Status da negociação", example = "true") @NotNull Boolean status,
        @Schema(description = "Número do pedido", example = "123456") String orderNumber) {}
