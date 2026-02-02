package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum LogisticStatus {
    PARTIAL("partial"),
    COMPLETE("complete"),
    IRREPARABLE("irreparable");

    private final String value;
}
