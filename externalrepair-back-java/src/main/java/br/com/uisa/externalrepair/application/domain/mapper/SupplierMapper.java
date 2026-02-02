package br.com.uisa.externalrepair.application.domain.mapper;

import br.com.uisa.externalrepair.adapter.in.web.dto.CreateRepairRequest;
import br.com.uisa.externalrepair.application.domain.model.Role;
import br.com.uisa.externalrepair.application.domain.model.Supplier;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SupplierMapper {

    @Mapping(source = "request.supplier", target = "name")
    @Mapping(source = "request.supplierCode", target = "code")
    @Mapping(source = "request.supplierEmail", target = "email")
    Supplier toSupplier(CreateRepairRequest request, Role role);
}
