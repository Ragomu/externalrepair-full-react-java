package br.com.uisa.externalrepair.application.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum DestinyItem {
    NONE("none"),
    RETURN("return"),
    IRREPARABLE("irreparable");

    private final String value;

    public static DestinyItem fromValue(String value) {
        for (DestinyItem destinyItem : DestinyItem.values()) {
            if (destinyItem.getValue().equalsIgnoreCase(value)) {
                return destinyItem;
            }
        }
        throw new IllegalArgumentException("Valor desconhecido: " + value);
    }
}
