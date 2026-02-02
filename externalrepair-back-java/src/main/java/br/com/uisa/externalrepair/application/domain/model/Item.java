package br.com.uisa.externalrepair.application.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String material;
    private String description;
    private Long quantity;
    private Long outputQuantity;
    private Long receivedQuantity;
    private Double unitWeight;
    private Double unitValue;
    private Double totalValue;
    private String dimensions;
    private String label;
    private String subject;
    private LocalDate receiptDate;
    private Long warehouseReceivedQuantity;
    private LocalDate warehouseReceiptDate;
    private String fleet;
    private String driver;
    private String plate;
    private String observation;
    private String carrier;
    private String contact;
    private String itemStatus;

    @Column(columnDefinition = "boolean default false")
    private Boolean received;

    @Column(columnDefinition = "boolean default false")
    private Boolean logisticAssigned;

    @Column(columnDefinition = "boolean default false")
    private Boolean warehouseReceived;

    @Column(columnDefinition = "boolean default false")
    private Boolean allSubItemsAssigned;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "repair_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private Repair repair;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private List<SubItem> subItems;
}
