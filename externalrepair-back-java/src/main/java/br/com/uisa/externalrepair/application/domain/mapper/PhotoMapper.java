package br.com.uisa.externalrepair.application.domain.mapper;

import br.com.uisa.externalrepair.application.domain.model.Photo;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PhotoMapper {

    Photo toPhoto(String name);
}
