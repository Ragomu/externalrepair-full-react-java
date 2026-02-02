package br.com.uisa.externalrepair.adapter.in.web.controller.logistic;

import br.com.uisa.externalrepair.adapter.in.web.dto.AssignLogisticRequest;
import br.com.uisa.externalrepair.adapter.in.web.dto.LogisticFleetType;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.SubItemRepository;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.MaintenanceType;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import br.com.uisa.externalrepair.application.service.RepairHistoryService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/assign-logistic")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AssignLogisticController {

    private final RepairRepository repairRepository;
    private final ItemRepository itemRepository;
    private final SubItemRepository subItemRepository;

    private final RepairHistoryService repairHistoryService;

    @PostMapping("/{nf}")
    @Transactional
    public ResponseEntity<Void> assignLogistic(
            @RequestBody AssignLogisticRequest request, @PathVariable String nf) {
        log.info("Assigning logistic for request: {}", request);

        Repair repair = repairRepository.findAllByNf(nf).getFirst();

        if (repair.getMaintenanceType().equals(MaintenanceType.PARTIAL.getValue())) {
            updateLogisticBySubItem(request, nf);

            List<SubItem> subItems = subItemRepository.findAllByRepairNf(nf);

            subItems.stream()
                    .filter(subItem -> subItem.getId().equals(request.id()))
                    .forEach(
                            subItem -> {
                                //                                List<SubItemStatusName> status =
                                // subItem.getStatus();
                                //                                status.add(SubItemStatusName.WAREHOUSE);
                                //                                subItem.setStatus(status);

                                List<SubItemStatusName> status = subItem.getStatus();
                                status.add(SubItemStatusName.WAREHOUSE);
                                subItem.setStatus(status);

                                //                                subItem.setStatus(
                                //                                        new ArrayList<>(
                                //                                                List.of(
                                //
                                // SubItemStatusName.MAINTENANCE,
                                //                                                        SubItemStatusName.FISCAL,
                                //
                                // SubItemStatusName.LOGISTICS,
                                //
                                // SubItemStatusName.WAREHOUSE)));
                                subItemRepository.save(subItem);
                            });

            boolean allSubItemsLogisticAssigned =
                    subItems.stream()
                            .allMatch(
                                    subItem ->
                                            subItem.getLogisticAssigned() != null && subItem.getLogisticAssigned());

            if (allSubItemsLogisticAssigned) {
                repairRepository.updateByStatus(nf, StatusName.DEFINICAO_TRANSPORTE);
            }
        } else {
            updateLogisticByItem(request, nf);

            List<Item> items = itemRepository.findAllByRepairNf(nf);

            items.forEach(
                    item ->
                            item.getSubItems().stream()
                                    .filter(subItem -> subItem.getId().equals(request.id()))
                                    .forEach(
                                            subItem -> {
                                                subItem.setStatus(
                                                        new ArrayList<>(
                                                                List.of(
                                                                        SubItemStatusName.MAINTENANCE,
                                                                        SubItemStatusName.FISCAL,
                                                                        SubItemStatusName.LOGISTICS,
                                                                        SubItemStatusName.WAREHOUSE)));
                                                subItemRepository.save(subItem);
                                            }));

            boolean allItemsLogisticAssigned =
                    items.stream()
                            .allMatch(item -> item.getLogisticAssigned() != null && item.getLogisticAssigned());

            if (allItemsLogisticAssigned) {
                repairRepository.updateByStatus(nf, StatusName.DEFINICAO_TRANSPORTE);
            }
        }

        return ResponseEntity.ok().build();
    }

    private void updateLogisticByItem(AssignLogisticRequest request, String nf) {
        if (request.fleet().equals(LogisticFleetType.EXTERNAL.getValue())) {
            itemRepository.updateByLogisticExternal(
                    request.id(),
                    nf,
                    request.fleet(),
                    request.observation(),
                    request.carrier(),
                    request.contact(),
                    request.plate());

            repairHistoryService.registerStatusChange(
                    repairRepository.findAllByNf(nf).getFirst(),
                    "Logística",
                    "Logística definida, transportadora "
                            + request.carrier()
                            + ", Placa: "
                            + request.plate()
                            + ", Motorista: "
                            + request.driver()
                            + ", Contato: "
                            + request.contact());
        } else {
            itemRepository.updateByLogisticUisa(
                    request.id(),
                    nf,
                    request.fleet(),
                    request.driver(),
                    request.plate(),
                    request.observation());

            repairHistoryService.registerStatusChange(
                    repairRepository.findAllByNf(nf).getFirst(),
                    "Logística",
                    "Logística definida, transportadora UISA"
                            + ", Placa: "
                            + request.plate()
                            + ", Motorista: "
                            + request.driver());
        }
    }

    private void updateLogisticBySubItem(AssignLogisticRequest request, String nf) {
        if (request.fleet().equals(LogisticFleetType.EXTERNAL.getValue())) {
            subItemRepository.updateByLogisticExternal(
                    request.id(),
                    nf,
                    request.fleet(),
                    request.observation(),
                    request.carrier(),
                    request.contact(),
                    request.plate());

            repairHistoryService.registerStatusChange(
                    repairRepository.findAllByNf(nf).getFirst(),
                    "Logística",
                    "Logística definida, transportadora "
                            + request.carrier()
                            + ", Placa: "
                            + request.plate());
        } else {
            subItemRepository.updateByLogisticUisa(
                    request.id(),
                    nf,
                    request.fleet(),
                    request.driver(),
                    request.plate(),
                    request.observation());

            repairHistoryService.registerStatusChange(
                    repairRepository.findAllByNf(nf).getFirst(),
                    "Logística",
                    "Logística definida, transportadora UISA" + ", Placa: " + request.plate());
        }
    }
}
