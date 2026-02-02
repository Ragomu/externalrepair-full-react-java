package br.com.uisa.externalrepair.adapter.in.web.exception;

import lombok.Builder;

@Builder
public record FieldErrorResponse(String field, String error) {}
