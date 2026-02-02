package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import lombok.Builder;

@Builder
public record HistoryItemResponse(
        String nf,
        @JsonFormat(pattern = "dd/MM/yyyy") LocalDate emissionDate,
        String issuer,
        String receiver,
        Double totalValue,
        String status) {}
