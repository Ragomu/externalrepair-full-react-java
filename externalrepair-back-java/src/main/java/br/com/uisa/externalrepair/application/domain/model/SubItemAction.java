package br.com.uisa.externalrepair.application.domain.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum SubItemAction {
    SELL("sell"),
    DISCARD("discard"),
    RETURN("return");

    private final String description;

    public static SubItemAction fromValue(String action) {
        for (SubItemAction subItemAction : SubItemAction.values()) {
            if (subItemAction.getDescription().equalsIgnoreCase(action)) {
                return subItemAction;
            }
        }
        throw new IllegalArgumentException("Valor desconhecido: " + action);
    }
}
