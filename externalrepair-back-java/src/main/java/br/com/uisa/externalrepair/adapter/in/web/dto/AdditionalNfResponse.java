package br.com.uisa.externalrepair.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record AdditionalNfResponse(String nfLink, String nfNumber) {}
