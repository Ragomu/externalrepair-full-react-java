package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum LogisticItemStatus {
    NONE("none"),
    ASSIGNED("assigned");

    private final String value;
}
