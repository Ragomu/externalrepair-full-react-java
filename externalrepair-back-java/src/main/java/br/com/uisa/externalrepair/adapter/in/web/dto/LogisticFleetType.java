package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum LogisticFleetType {
    UISA("uisa"),
    EXTERNAL("external");

    private final String value;
}
