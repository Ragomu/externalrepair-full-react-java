package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum WarehouseItemStatus {
    NONE("none"),
    RECEIVED("received");

    private final String value;
}
