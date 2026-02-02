package br.com.uisa.externalrepair.application.domain.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum MaintenanceType {
    COMPLETE("complete"),
    PARTIAL("partial"),
    NONE("none");

    private final String value;
}
