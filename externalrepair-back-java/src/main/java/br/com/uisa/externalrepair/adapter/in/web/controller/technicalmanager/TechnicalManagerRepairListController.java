package br.com.uisa.externalrepair.adapter.in.web.controller.technicalmanager;

import br.com.uisa.externalrepair.adapter.in.web.dto.TechnicalManagerRepairResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController()
@RequestMapping("/technical-manager-nfs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TechnicalManagerRepairListController {

    private final RepairRepository repairRepository;

    @GetMapping
    public ResponseEntity<List<TechnicalManagerRepairResponse>> getTechnicalManagerRepairList(
            @RequestParam(value = "query", required = false) String query) {
        List<Repair> repairs =
                repairRepository.findAllBySubItemStatusNameIs(SubItemStatusName.TECHNICAL_MANAGER);

        if (StringUtils.isNotEmpty(query)) {
            repairs =
                    repairRepository.findAllByNfOrSubItemStatusNameIs(
                            query, SubItemStatusName.TECHNICAL_MANAGER);
        }

        List<TechnicalManagerRepairResponse> response =
                repairs.stream()
                        .map(
                                repair ->
                                        TechnicalManagerRepairResponse.builder()
                                                .nf(repair.getNf())
                                                .emissionDate(repair.getDepartureDateUisa())
                                                .issuer("Usinas Itamarati S/A")
                                                .receiver(repair.getSupplier().getName())
                                                .totalQuantity(
                                                        repair.getItems().stream()
                                                                .map(Item::getOutputQuantity)
                                                                .reduce(0L, Long::sum))
                                                .build())
                        .toList();

        return ResponseEntity.ok(response);
    }
}
