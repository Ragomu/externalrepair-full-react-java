package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record ReceiptItemResponse(String nf, String fluigNumber, List<ItemResponse> items) {
    @Builder
    public record ItemResponse(
            Long id,
            String request,
            String material,
            Long quantity,
            String description,
            Double unitPrice,
            Double totalPrice,
            Boolean received,
            String subject,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
                    LocalDate shippingDate) {}
}
