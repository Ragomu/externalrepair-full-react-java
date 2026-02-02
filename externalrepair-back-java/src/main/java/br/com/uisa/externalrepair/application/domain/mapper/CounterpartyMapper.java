package br.com.uisa.externalrepair.application.domain.mapper;

import br.com.uisa.externalrepair.adapter.in.web.dto.CreateRepairRequest;
import br.com.uisa.externalrepair.application.domain.model.Person;
import br.com.uisa.externalrepair.application.domain.model.PersonType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CounterpartyMapper {

    @Mapping(source = "request.counterparty", target = "name")
    @Mapping(source = "request.counterpartyEmail", target = "email")
    Person toCounterparty(CreateRepairRequest request, PersonType personType);
}
