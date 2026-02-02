package br.com.uisa.externalrepair.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record CreateRepairRequest(
        @Schema(description = "Número Fluig", example = "513130") @NotBlank String fluigNumber,
        @Schema(description = "Almoxarifado", example = "AGRICOLA") @NotBlank String warehouse,
        @Schema(description = "Logística", example = "SPOT") @NotBlank String logistic,
        @Schema(description = "Fornecedor", example = "COMERCIO DE EXTINTORES MATO GROSSO") @NotBlank
                String supplier,
        @Schema(description = "CNPJ do fornecedor", example = "06088847000156") @NotBlank
                String document,
        @Schema(description = "E-mail do fornecedor", example = "gabriel.machado@platformbuilders.io")
                @NotBlank
                String supplierEmail,
        @Schema(description = "Código do fornecedor", example = "2000580") @NotBlank
                String supplierCode,
        @Schema(description = "Cidade", example = "TANGARÁ DA SERRA") @NotBlank String city,
        @Schema(description = "Estado", example = "MT") @NotBlank String state,
        @Schema(description = "NF-e", example = "000416972") @NotBlank String nf,
        @Schema(description = "Data de vencimento da NF-e", example = "2024-06-20") @NotNull
                LocalDate expirationDateNf,
        @Schema(description = "Incoterms", example = "CIF") @NotBlank String incoterms,
        @Schema(description = "Prioridade", example = "A") @NotBlank String priority,
        @Schema(description = "Data de retorno desejada", example = "2024-05-25") @NotNull
                LocalDate desirableReturnDate,
        @Schema(description = "Contraparte", example = "DIEGO MAMANI DA COSTA") @NotBlank
                String counterparty,
        @Schema(description = "E-mail da contraparte", example = "diego.costa@uisa.com.br") @NotBlank
                String counterpartyEmail,
        @Schema(description = "Gestor técnico", example = "IGOR ARAUJO") @NotBlank
                String technicalManager,
        @Schema(description = "E-mail do gestor técnico", example = "igor.garcia@uisa.com.br") @NotBlank
                String technicalManagerEmail,
        @Schema(description = "Data de saída da UISA", example = "2024-03-25") @NotNull
                LocalDate departureDateUisa,
        @Schema(description = "Requisição", example = "0010164654") @NotBlank String request,
        @Schema(description = "Itens da requisição") @NotEmpty List<CreateRepairItemRequest> items) {}
