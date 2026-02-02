package br.com.uisa.externalrepair.application.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class SubItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String returnNfNumber;
    private LocalDate returnNfDate;
    private Long returnQuantity;
    private Boolean fiscalApproved;
    private String justification;
    private Long irreparableQuantity;
    private String counterpartyItemStatus;
    private String technicalManagerItemStatus;

    @Enumerated(EnumType.STRING)
    private SubItemAction action;

    @Enumerated(EnumType.STRING)
    private DestinyItem destinyItem;

    @Enumerated(EnumType.STRING)
    private SubItemLabel subItemLabel;

    @Enumerated(EnumType.STRING)
    private SubItemStatus subItemStatus;

    private String fleet;
    private String driver;
    private String plate;
    private String observation;
    private String carrier;
    private String contact;

    @Column(columnDefinition = "boolean default false")
    private Boolean logisticAssigned;

    private Long warehouseReceivedQuantity;
    private LocalDate warehouseReceiptDate;

    @Column(columnDefinition = "boolean default false")
    private Boolean warehouseReceived;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private Item item;

    @OneToMany(mappedBy = "subItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private List<SubItemMaintenance> subItemMaintenances;

    @ElementCollection(targetClass = SubItemStatusName.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "sub_item_status_names", joinColumns = @JoinColumn(name = "sub_item_id"))
    @Column(name = "status_name")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private List<SubItemStatusName> status;

    @OneToMany(mappedBy = "subItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private List<SubItemDetail> subItemDetails;
}
