package br.com.uisa.externalrepair.application.domain.mapper;

import br.com.uisa.externalrepair.adapter.in.web.dto.CreateRepairRequest;
import br.com.uisa.externalrepair.application.domain.model.Logistic;
import br.com.uisa.externalrepair.application.domain.model.Person;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.Status;
import br.com.uisa.externalrepair.application.domain.model.Supplier;
import br.com.uisa.externalrepair.application.domain.model.Warehouse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RepairMapper {

    @Mapping(target = "warehouse", source = "warehouse")
    @Mapping(target = "supplier", source = "supplier")
    @Mapping(target = "counterparty", source = "counterparty")
    @Mapping(target = "technicalManager", source = "technicalManager")
    @Mapping(target = "logistic", source = "logistic")
    Repair toRepair(
            CreateRepairRequest request,
            Warehouse warehouse,
            Supplier supplier,
            Person counterparty,
            Person technicalManager,
            Logistic logistic,
            Status status);
}
