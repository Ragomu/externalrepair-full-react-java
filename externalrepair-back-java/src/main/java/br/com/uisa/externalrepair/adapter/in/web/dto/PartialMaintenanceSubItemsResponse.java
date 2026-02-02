package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record PartialMaintenanceSubItemsResponse(String nf, List<ItemResponse> items) {

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
            String itemStatus,
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
            String dimensions,
            String destinyItem,
            List<SentNf> sentNfs) {}

    @Builder
    public record SentNf(String returnNf, String justification) {}
}
