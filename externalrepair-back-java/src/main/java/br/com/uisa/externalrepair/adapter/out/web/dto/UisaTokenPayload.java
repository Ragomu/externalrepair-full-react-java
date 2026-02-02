package br.com.uisa.externalrepair.adapter.out.web.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UisaTokenPayload(long iat, long exp, UisaUserData data) {
    public record UisaUserData(
            @JsonProperty("personKey") String personKey,
            String name,
            String email,
            @JsonProperty("jobTitle") String jobTitle) {}
}
