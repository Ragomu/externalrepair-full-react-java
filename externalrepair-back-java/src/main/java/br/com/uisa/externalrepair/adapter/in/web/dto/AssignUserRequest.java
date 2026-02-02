package br.com.uisa.externalrepair.adapter.in.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import lombok.Builder;

@Builder
public record AssignUserRequest(@Email String email, @NotEmpty List<String> types) {}
