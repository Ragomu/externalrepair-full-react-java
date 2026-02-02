package br.com.uisa.externalrepair.application.domain.mapper;

import br.com.uisa.externalrepair.adapter.in.web.dto.CreateRepairRequest;
import br.com.uisa.externalrepair.application.domain.model.Logistic;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LogisticMapper {

    @Mapping(source = "logistic", target = "name")
    Logistic toLogistic(CreateRepairRequest request);
}
