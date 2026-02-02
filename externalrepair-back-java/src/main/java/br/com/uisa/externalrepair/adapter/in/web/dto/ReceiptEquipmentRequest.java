package br.com.uisa.externalrepair.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record ReceiptEquipmentRequest(
        @Schema(description = "NF-e", example = "0010164654") @NotBlank String nf,
        @Schema(description = "Itens recebidos") @NotEmpty List<ReceiptEquipmentItem> items) {
    public record ReceiptEquipmentItem(
            @Schema(description = "Código do equipamento", example = "123456") @NotNull Long id,
            @Schema(description = "Quantidade recebida", example = "5") @NotNull Integer receivedQuantity,
            @Schema(description = "Data de recebimento", example = "2024-06-20") @NotNull
                    LocalDate receiptDate) {}
}
