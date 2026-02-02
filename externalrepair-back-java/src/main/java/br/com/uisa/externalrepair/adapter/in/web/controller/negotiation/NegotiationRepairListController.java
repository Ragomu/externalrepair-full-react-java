package br.com.uisa.externalrepair.adapter.in.web.controller.negotiation;

import br.com.uisa.externalrepair.adapter.in.web.dto.NegotiationRepairResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController()
@RequestMapping("/negotiation-nfs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NegotiationRepairListController {

    private final RepairRepository repairRepository;

    @GetMapping
    public ResponseEntity<List<NegotiationRepairResponse>> getNegotiationRepairList() {
        log.info("Fetching negotiation repair list");

        List<NegotiationRepairResponse> response =
                repairRepository.findAllByStatusName(StatusName.ENTRADA_RECEBIDA).stream()
                        .map(
                                repair ->
                                        new NegotiationRepairResponse(
                                                repair.getSupplier().getDocument(), repair.getNf(), repair.getRequest()))
                        .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
