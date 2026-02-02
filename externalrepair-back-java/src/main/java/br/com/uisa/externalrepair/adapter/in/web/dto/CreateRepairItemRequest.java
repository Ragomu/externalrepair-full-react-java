package br.com.uisa.externalrepair.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@NotBlank
public record CreateRepairItemRequest(
        @Schema(description = "Material do item", example = "106004") @NotBlank String material,
        @Schema(description = "Descrição do item", example = "JC NPK 3030") @NotBlank
                String description,
        @Schema(description = "Quantidade do item", example = "2") @NotBlank String quantity,
        @Schema(description = "Peso unitário do item", example = "20.00") @NotBlank String unitWeight,
        @Schema(description = "Quantidade de saída do item", example = "2") @NotBlank
                String outputQuantity,
        @Schema(description = "Etiqueta do item", example = "300.00") @NotBlank String label,
        @Schema(description = "Dimensões do item", example = "300.00") @NotBlank String dimensions,
        @Schema(description = "Valor unitário do item", example = "300.00") @NotBlank String unitValue,
        @Schema(description = "Valor total do item", example = "600.00") @NotBlank String totalValue,
        @Schema(description = "Descrição/Assunto do item", example = "JC NPK 3030") @NotBlank
                String subject) {}
