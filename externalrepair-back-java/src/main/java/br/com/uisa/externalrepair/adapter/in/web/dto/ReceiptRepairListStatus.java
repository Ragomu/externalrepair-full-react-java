package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ReceiptRepairListStatus {
    ALL("all"),
    NEGOTIATION("negotiation"),
    TRANSIT("transit");

    public final String value;
}
