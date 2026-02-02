package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum WarehouseStatus {
    NONE("none"),
    PENDING("pending"),
    FINISHED("finished");

    private final String value;
}
