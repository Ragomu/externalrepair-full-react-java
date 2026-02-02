package br.com.uisa.externalrepair.application.domain.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum SubItemLabel {
    IN_TRANSIT("in_transit"),
    RETURNED("returned"),
    WAITING_APPROVAL("waiting_approval"),
    FINISHED("finished"),
    CORRECTION_SENT("correction_sent"),
    APPROVED("approved"),
    REPROVED("reproved"),
    IRREPARABLE_RETURN("irreparable_return"),
    IRREPARABLE_DISCARD("irreparable_discard"),
    IRREPARABLE_SELL("irreparable_sell"),
    NONE("none");

    private final String description;
}
