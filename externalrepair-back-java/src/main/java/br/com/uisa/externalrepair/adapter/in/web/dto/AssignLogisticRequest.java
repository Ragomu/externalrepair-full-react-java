package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record AssignLogisticRequest(
        Long id,
        String fleet,
        String driver,
        String plate,
        String observation,
        String carrier,
        String contact) {}
