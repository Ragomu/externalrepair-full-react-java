package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TechnicalManagerAction {
    APPROVE("approve"),
    REJECT("reject");

    private final String action;

    public static TechnicalManagerAction fromValue(String action) {
        for (TechnicalManagerAction technicalManagerAction : TechnicalManagerAction.values()) {
            if (technicalManagerAction.getAction().equalsIgnoreCase(action)) {
                return technicalManagerAction;
            }
        }
        throw new IllegalArgumentException("Unknown value: " + action);
    }
}
