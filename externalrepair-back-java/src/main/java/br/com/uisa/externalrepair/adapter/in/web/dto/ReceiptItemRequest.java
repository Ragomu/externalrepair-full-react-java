package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Builder;

@Builder
public record ReceiptItemRequest(
        @Schema(description = "Código do equipamento", example = "123456") @NotNull Long id,
        @Schema(description = "Quantidade recebida", example = "5") @NotNull Integer receivedQuantity,
        @Schema(description = "Data de recebimento", example = "2024-06-20")
                @NotNull
                @JsonFormat(pattern = "dd/MM/yyyy")
                LocalDate receiptDate) {}
