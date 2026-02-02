package br.com.uisa.externalrepair.adapter.in.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record LoginRequest(@NotBlank String email, @NotBlank String password) {}
