package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record LogisticItemResponse(
        String nf, String fluigNumber, String logisticStatus, List<ItemResponse> items) {
    @Builder
    public record ItemResponse(
            Long id,
            String request,
            String material,
            Long quantity,
            String description,
            Double unitPrice,
            Double totalPrice,
            String dimensions,
            String logisticItemStatus,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate shippingDate,
            String label) {}
}
