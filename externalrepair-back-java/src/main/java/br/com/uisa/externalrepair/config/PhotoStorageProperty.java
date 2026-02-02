package br.com.uisa.externalrepair.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "photo")
@Getter
@Setter
public class PhotoStorageProperty {

    private String path;
}
