package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import lombok.Builder;

@Builder
public record FlagSubItemRequest(
        Long id,
        String returnNfNumber,
        Long returnQuantity,
        @JsonFormat(pattern = "yyyy-MM-dd") LocalDate returnNfDate,
        String destinyItem) {}
