package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record MaintenanceItemResponse(
        String nf,
        List<ItemResponse> items,
        String returnNf,
        String justification,
        String maintenanceStatus,
        String fluigNumber,
        List<SentNf> sentNfs) {
    @Builder
    public record ItemResponse(
            Long id,
            String material,
            Long quantity,
            String description,
            Double unitPrice,
            Double totalPrice,
            String dimensions,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate date) {}

    @Builder
    public record SentNf(String returnNf, String justification) {}
}
