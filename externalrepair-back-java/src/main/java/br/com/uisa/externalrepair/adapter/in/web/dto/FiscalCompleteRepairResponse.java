package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record FiscalCompleteRepairResponse(
        String nf, String returnNf, List<ItemResponse> items, String status, String fluigNumber) {
    @Builder
    public record ItemResponse(
            Long id,
            String request,
            String material,
            Long quantity,
            String description,
            Double unitPrice,
            String totalPrice,
            String dimensions,
            String label,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate date) {}
}
