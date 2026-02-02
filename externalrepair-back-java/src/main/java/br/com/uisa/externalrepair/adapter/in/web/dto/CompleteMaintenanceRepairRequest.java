package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.List;

public record CompleteMaintenanceRepairRequest(
        @JsonFormat(pattern = "dd/MM/yyyy") LocalDate returnDate,
        String returnNfNumber,
        List<String> additionalNfNumbers) {}
