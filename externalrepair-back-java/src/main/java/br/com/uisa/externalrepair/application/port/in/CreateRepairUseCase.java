package br.com.uisa.externalrepair.application.port.in;

import br.com.uisa.externalrepair.adapter.in.web.dto.CreateRepairRequest;
import org.springframework.web.multipart.MultipartFile;

public interface CreateRepairUseCase {

    void handleCreateRepair(CreateRepairRequest request, MultipartFile pdf);
}
