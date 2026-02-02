package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record RepairHistoryResponse(String nf, String fluigNumber, List<ItemResponse> items) {
    @Builder
    public record ItemResponse(
            String status,
            String description,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDateTime date) {}
}
