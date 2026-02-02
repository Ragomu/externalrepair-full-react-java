package br.com.uisa.externalrepair.application.port.in;

import br.com.uisa.externalrepair.adapter.in.web.dto.LoginRequest;
import br.com.uisa.externalrepair.adapter.in.web.dto.LoginResponse;

public interface LoginUseCase {

    LoginResponse login(LoginRequest request);
}
