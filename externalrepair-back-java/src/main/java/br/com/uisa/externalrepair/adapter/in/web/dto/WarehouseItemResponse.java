package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record WarehouseItemResponse(
        String nf, String fluigNumber, String warehouseStatus, List<ItemResponse> items) {
    @Builder
    public record ItemResponse(
            Long id,
            String material,
            Long returnedQuantity,
            Double unitValue,
            String dimensions,
            String label,
            String description,
            Double unitWeight,
            String warehouseItemStatus,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate date,
            Long receivedQuantity,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate receiptDate) {}
}
