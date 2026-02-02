package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record FiscalPartialRepairResponse(String nf, String fluigNumber, List<ItemResponse> items) {

    @Builder
    public record ItemResponse(
            Long id,
            String material,
            Long quantity,
            String description,
            Double unitPrice,
            Double totalPrice,
            String dimensions,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate date,
            List<SubItemResponse> subItems) {}

    @Builder
    public record SubItemResponse(
            String returnNfNumber,
            String subItemStatus,
            String subItemLabel,
            Long id,
            Long returnQuantity,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate returnDate,
            String material,
            String description,
            Double unitPrice,
            Double unitWeight,
            String dimensions) {}
}
