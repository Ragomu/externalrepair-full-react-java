package br.com.uisa.externalrepair.application.port.in;

import br.com.uisa.externalrepair.adapter.in.web.dto.NegotiationRepairRequest;

public interface NegotiationRepairUseCase {

    void handleNegotiationRepairResponse(NegotiationRepairRequest request);
}
