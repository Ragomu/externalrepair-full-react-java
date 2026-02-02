package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MaintenanceStatus {
    SENT("sent"),
    APPROVED("approved"),
    REPROVED("reproved"),
    NOT_INITIALIZED("notInitialized"),
    CORRECTION_SENT("correctionSent");

    private final String value;
}
