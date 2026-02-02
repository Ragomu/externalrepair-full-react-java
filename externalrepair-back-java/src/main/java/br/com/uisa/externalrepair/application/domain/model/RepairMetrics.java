package br.com.uisa.externalrepair.application.domain.model;

import lombok.Data;

@Data
public class RepairMetrics {
    private final Integer quantity;
    private final Integer itemQuantity;
    private final Double value;
}
