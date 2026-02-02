package br.com.uisa.externalrepair.application.domain.mapper;

import br.com.uisa.externalrepair.adapter.in.web.dto.CreateRepairRequest;
import br.com.uisa.externalrepair.application.domain.model.Person;
import br.com.uisa.externalrepair.application.domain.model.PersonType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TechnicalManagerMapper {

    @Mapping(source = "request.technicalManager", target = "name")
    @Mapping(source = "request.technicalManagerEmail", target = "email")
    Person toTechnicalManager(CreateRepairRequest request, PersonType personType);
}
