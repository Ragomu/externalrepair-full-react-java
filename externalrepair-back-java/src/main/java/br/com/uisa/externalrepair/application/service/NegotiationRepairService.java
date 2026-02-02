package br.com.uisa.externalrepair.application.service;

import br.com.uisa.externalrepair.adapter.in.web.dto.NegotiationRepairRequest;
import br.com.uisa.externalrepair.adapter.out.db.repository.ItemRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.DestinyItem;
import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.MaintenanceType;
import br.com.uisa.externalrepair.application.domain.model.Status;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.domain.model.SubItem;
import br.com.uisa.externalrepair.application.domain.model.SubItemLabel;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatus;
import br.com.uisa.externalrepair.application.domain.model.SubItemStatusName;
import br.com.uisa.externalrepair.application.port.in.NegotiationRepairUseCase;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class NegotiationRepairService implements NegotiationRepairUseCase {

    private final RepairRepository repairRepository;
    private final ItemRepository itemRepository;

    private final RepairHistoryService repairHistoryService;

    @Override
    public void handleNegotiationRepairResponse(NegotiationRepairRequest request) {
        repairRepository.findAllByNf(request.nf()).stream()
                .findFirst()
                .ifPresent(
                        repair -> {
                            boolean allItemsReceived = repair.getItems().stream().allMatch(Item::getReceived);

                            if (!allItemsReceived) {
                                throw new IllegalStateException(
                                        "Nem todos os itens foram recebidos para a NF: " + request.nf());
                            }
                        });

        if (request.status()) {
            repairRepository.updateByOrderNumberAndStatusAndNegotiationApproved(
                    request.nf(), request.orderNumber(), StatusName.NEGOCIACAO_IBID, request.document());

            repairHistoryService.registerStatusChange(
                    repairRepository.findAllByNf(request.nf()).getFirst(),
                    "Negociação",
                    "Negociação finalizada e pedido criado: " + request.orderNumber());
        } else {
            //            repairRepository.updateByNegotiationApproved(request.nf(), request.document());

            //            repairRepository.updateByStatus(request.nf(), StatusName.AVALIACAO_TECNICA);

            repairRepository.findAllByNf(request.nf()).stream()
                    .findFirst()
                    .ifPresent(
                            repair -> {
                                repair
                                        .getItems()
                                        .forEach(
                                                item -> {
                                                    SubItem subItem =
                                                            SubItem.builder()
                                                                    .item(item)
                                                                    .destinyItem(DestinyItem.IRREPARABLE)
                                                                    .subItemLabel(SubItemLabel.NONE)
                                                                    .subItemStatus(SubItemStatus.IRREPARABLE)
                                                                    .irreparableQuantity(item.getReceivedQuantity())
                                                                    .status(new ArrayList<>(List.of(SubItemStatusName.COUNTERPARTY)))
                                                                    .build();
                                                    item.setSubItems(new ArrayList<>(Collections.singletonList(subItem)));
                                                    itemRepository.save(item);
                                                });

                                repair.setMaintenanceType(MaintenanceType.PARTIAL.getValue());
                                repair.setNegotiationApproved(Boolean.FALSE);
                                repair.setStatus(Status.builder().name(StatusName.AVALIACAO_TECNICA).build());
                                repairRepository.save(repair);
                            });

            repairHistoryService.registerStatusChange(
                    repairRepository.findAllByNf(request.nf()).getFirst(),
                    "Negociação",
                    "Negociação reprovada para a NF: " + request.nf());
        }
    }
}
