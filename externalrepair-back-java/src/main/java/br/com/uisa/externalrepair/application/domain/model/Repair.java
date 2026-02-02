package br.com.uisa.externalrepair.application.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
import org.hibernate.annotations.ConcreteProxy;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ConcreteProxy
public class Repair {

    @Id private String request;
    private String fluigNumber;
    private String nf;
    private String incoterms;
    private String priority;
    private LocalDate desirableReturnDate;
    private LocalDate departureDateUisa;
    private Boolean negotiationApproved;
    private String orderNumber;
    private LocalDate returnDate;
    private String returnNf;
    private String maintenanceType;
    private String justification;
    private Boolean reproved;
    private Boolean correctionSent;
    private String fleet;
    private String driver;
    private String plate;
    private String observation;
    private String carrier;
    private String contact;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_name", referencedColumnName = "name")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private Warehouse warehouse;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_name", referencedColumnName = "name")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private Status status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "supplier_document", referencedColumnName = "document")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private Supplier supplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "counterparty_email", referencedColumnName = "email")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private Person counterparty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "technical_manager_email", referencedColumnName = "email")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private Person technicalManager;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "logistic_name", referencedColumnName = "name")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private Logistic logistic;

    @OneToMany(mappedBy = "repair", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private List<Photo> photo;

    @OneToMany(mappedBy = "repair", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private List<Item> items;
}
