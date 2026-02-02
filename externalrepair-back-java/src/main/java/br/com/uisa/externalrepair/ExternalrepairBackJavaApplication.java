package br.com.uisa.externalrepair;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@OpenAPIDefinition
@EnableJpaAuditing
@EnableScheduling
@Slf4j
@RequiredArgsConstructor
public class ExternalrepairBackJavaApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExternalrepairBackJavaApplication.class, args);
    }
}
