package br.com.uisa.externalrepair.adapter.in.web.controller;

import br.com.uisa.externalrepair.adapter.in.web.api.HomeApi;
import br.com.uisa.externalrepair.adapter.in.web.dto.HomeResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.ActionRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.NotificationRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.Action;
import br.com.uisa.externalrepair.application.domain.model.FilterType;
import br.com.uisa.externalrepair.application.domain.model.Notification;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.RepairMetrics;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.config.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HomeController implements HomeApi {

    private final RepairRepository repairRepository;
    private final NotificationRepository notificationRepository;
    private final ActionRepository actionRepository;
    private final TokenProvider tokenProvider;

    @GetMapping("/{supplierDocument}")
    @Override
    public ResponseEntity<HomeResponse> home(
            @PathVariable(value = "supplierDocument") String supplierDocument,
            @RequestParam(value = "maintenanceType", defaultValue = "nf") String maintenanceType,
            @RequestParam(value = "transitType", defaultValue = "item") String transitType,
            @RequestParam(value = "negotiationType", defaultValue = "value") String negotiationType,
            HttpServletRequest request) {
        log.info("Recebendo requisição para listar reparos");

        Boolean isUisa = tokenProvider.isUisaToken(request);

        List<Repair> repairs;

        if (Boolean.TRUE.equals(isUisa)) {
            repairs = repairRepository.findAll();
        } else {
            repairs = repairRepository.findAllBySupplierDocument(supplierDocument);
        }

        Instant startDate =
                LocalDate.now().minusDays(7).atStartOfDay(ZoneId.systemDefault()).toInstant();
        List<Notification> notifications;
        List<Action> actions;

        if (Boolean.TRUE.equals(isUisa)) {
            notifications = notificationRepository.findAllByCreatedAtGreaterThan(startDate);
            actions = actionRepository.findAllByCreatedAtGreaterThan(startDate);
        } else {
            notifications =
                    notificationRepository.findAllBySupplierDocumentAndCreatedAtGreaterThan(
                            supplierDocument, startDate);
            actions =
                    actionRepository.findAllBySupplierDocumentAndCreatedAtGreaterThan(
                            supplierDocument, startDate);
        }

        if (repairs.isEmpty()) {
            log.info("Nenhum reparo encontrado para o fornecedor com documento: {}", supplierDocument);
            return ResponseEntity.ok().build();
        }

        FilterType maintenanceFilterType = getFilterType(maintenanceType);
        FilterType transitFilterType = getFilterType(transitType);
        FilterType negotiationFilterType = getFilterType(negotiationType);

        RepairMetrics maintenanceMetrics = calculateMetrics(repairs, StatusName.NEGOCIACAO_IBID);
        RepairMetrics transitMetrics = calculateMetrics(repairs, StatusName.INICIO_REPARO);
        RepairMetrics negotiationMetrics = calculateMetrics(repairs, StatusName.ENTRADA_RECEBIDA);

        LocalDate startOfMonth = LocalDate.now().withDayOfMonth(1);

        List<Repair> repairsOfThisMonth;

        if (Boolean.TRUE.equals(isUisa)) {
            repairsOfThisMonth = repairRepository.findAllByDepartureDateUisaIsGreaterThan(startOfMonth);
        } else {
            repairsOfThisMonth =
                    repairRepository.findAllBySupplierDocumentAndDepartureDateUisaIsGreaterThan(
                            supplierDocument, startOfMonth);
        }

        RepairMetrics monthlyMaintenanceMetrics =
                calculateMetrics(repairsOfThisMonth, StatusName.NEGOCIACAO_IBID);

        HomeResponse homeResponse =
                HomeResponse.builder()
                        .maintenance(getFilterValue(maintenanceMetrics, maintenanceFilterType))
                        .maintenanceVariation(
                                (int)
                                        (getFilterValue(monthlyMaintenanceMetrics, maintenanceFilterType)
                                                - getFilterValue(maintenanceMetrics, maintenanceFilterType)))
                        .transit(getFilterValue(transitMetrics, transitFilterType))
                        .negotiation(getFilterValue(negotiationMetrics, negotiationFilterType))
                        .notifications(createNotifications(notifications, actions))
                        .build();

        log.info("Requisição para listar reparos realizada com sucesso");
        return ResponseEntity.ok(homeResponse);
    }

    private FilterType getFilterType(String filterType) {
        return switch (filterType) {
            case "item" -> FilterType.ITEM;
            case "value" -> FilterType.VALUE;
            default -> FilterType.NF;
        };
    }

    private double getFilterValue(RepairMetrics metrics, FilterType filterType) {
        return switch (filterType) {
            case ITEM -> metrics.getItemQuantity();
            case VALUE ->
                    BigDecimal.valueOf(metrics.getValue())
                            .round(new MathContext(4, RoundingMode.HALF_UP))
                            .doubleValue();
            case NF -> metrics.getQuantity();
        };
    }

    private RepairMetrics calculateMetrics(List<Repair> repairs, StatusName statusName) {
        List<Repair> filteredRepairs =
                repairs.stream().filter(repair -> repair.getStatus().getName().equals(statusName)).toList();

        Integer quantity = filteredRepairs.size();
        Integer itemQuantity =
                filteredRepairs.stream()
                        .mapToInt(
                                repair ->
                                        repair.getItems().stream()
                                                .mapToInt(
                                                        item ->
                                                                Math.toIntExact(
                                                                        item.getReceivedQuantity() == null
                                                                                ? item.getOutputQuantity()
                                                                                : item.getReceivedQuantity()))
                                                .sum())
                        .sum();
        double value =
                filteredRepairs.stream()
                        .mapToDouble(
                                repair ->
                                        repair.getItems().stream()
                                                .mapToDouble(item -> item.getTotalValue() / 1000)
                                                .sum())
                        .sum();

        return new RepairMetrics(quantity, itemQuantity, value);
    }

    private HomeResponse.Notifications createNotifications(
            List<Notification> notifications, List<Action> actions) {
        return HomeResponse.Notifications.builder()
                .total(notifications.size() + actions.size())
                .messages(
                        notifications.stream()
                                .map(
                                        notification ->
                                                HomeResponse.Notifications.Message.builder()
                                                        .name(notification.getName())
                                                        .action(notification.getAction())
                                                        .nf(notification.getNf())
                                                        .date(
                                                                LocalDateTime.ofInstant(
                                                                        notification.getCreatedAt(), ZoneId.systemDefault()))
                                                        .build())
                                .toList())
                .actions(
                        actions.stream()
                                .map(
                                        action ->
                                                HomeResponse.Notifications.Action.builder()
                                                        .title(action.getTitle())
                                                        .message(action.getMessage())
                                                        .nf(action.getNf())
                                                        .date(
                                                                LocalDateTime.ofInstant(
                                                                        action.getCreatedAt(), ZoneId.systemDefault()))
                                                        .build())
                                .toList())
                .build();
    }
}
