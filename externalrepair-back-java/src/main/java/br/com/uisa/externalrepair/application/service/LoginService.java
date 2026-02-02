package br.com.uisa.externalrepair.application.service;

import br.com.uisa.externalrepair.adapter.in.web.dto.LoginRequest;
import br.com.uisa.externalrepair.adapter.in.web.dto.LoginResponse;
import br.com.uisa.externalrepair.application.domain.model.Supplier;
import br.com.uisa.externalrepair.application.port.in.LoginUseCase;
import br.com.uisa.externalrepair.config.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService implements LoginUseCase {
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;

    @Override
    public LoginResponse login(LoginRequest request) {
        UsernamePasswordAuthenticationToken credentials =
                new UsernamePasswordAuthenticationToken(request.email(), request.password());

        Authentication authentication = authenticationManager.authenticate(credentials);

        String token = tokenProvider.generateToken((Supplier) authentication.getPrincipal());

        return new LoginResponse(token);
    }
}
