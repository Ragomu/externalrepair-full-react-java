package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record FiscalCorrectCompleteNfRequest(String justification, String returnNf) {}
