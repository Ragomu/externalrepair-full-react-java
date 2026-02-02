package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record TechnicalManagerItemResponse(
        String nf, String fluigNumber, List<ItemResponse> items) {

    @Builder
    public record ItemResponse(
            String nf,
            Long id,
            String material,
            String description,
            Long sent,
            Long irreparable,
            Double unitValue,
            Double totalValue,
            String itemStatus,
            Double unitWeight,
            String dimensions,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate date,
            List<SubItemResponse> subItems) {}

    @Builder
    public record SubItemResponse(
            String subItemAction,
            Long id,
            Long quantity,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate date,
            String material,
            String description,
            Double unitPrice,
            Long sent,
            Long irreparable,
            String label,
            Double unitWeight,
            String dimensions,
            String technicalManagerStatus) {}
}
