package br.com.uisa.externalrepair.application.domain.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum SubItemStatus {
    IRREPARABLE("irreparable"),
    RETURNABLE("returnable"),
    DISCARD("discard"),
    NONE("none");

    private final String description;
}
