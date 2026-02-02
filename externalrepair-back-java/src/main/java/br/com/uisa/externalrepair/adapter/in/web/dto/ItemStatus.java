package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ItemStatus {
    NONE("none"),
    INITIALIZED("initialized"),
    FINISHED("finished");

    private final String status;
}
