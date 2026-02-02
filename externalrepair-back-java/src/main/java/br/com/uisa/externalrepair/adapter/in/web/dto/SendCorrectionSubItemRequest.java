package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

public record SendCorrectionSubItemRequest(
        Long subItemId,
        String returnNfNumber,
        Long returnQuantity,
        @JsonFormat(pattern = "yyyy-MM-dd") LocalDate returnNfDate) {}
