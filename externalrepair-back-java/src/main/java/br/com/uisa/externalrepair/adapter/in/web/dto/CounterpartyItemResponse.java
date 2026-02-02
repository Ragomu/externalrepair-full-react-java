package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record CounterpartyItemResponse(String nf, String fluigNumber, List<ItemResponse> items) {

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
            Double unitWeight,
            String dimensions,
            String itemStatus,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate date,
            List<SubItemResponse> subItems) {}

    @Builder
    public record SubItemResponse(
            String subItemAction,
            Long id,
            Long quantity,
            String material,
            String description,
            Double unitPrice,
            Double unitWeight,
            String dimensions,
            String label) {}
}
