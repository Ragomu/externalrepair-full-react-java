package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import lombok.Builder;

@Builder
public record MaintenanceRepairResponse(
        String nf,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate emissionDate,
        String issuer,
        String receiver,
        Long totalQuantity) {}
