package br.com.uisa.externalrepair.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record HomeResponse(
        @Schema(description = "Manutenção", example = "189") Double maintenance,
        @Schema(description = "Variação de Manutenção no último mês", example = "5")
                Integer maintenanceVariation,
        @Schema(description = "Trânsito", example = "43") Double transit,
        @Schema(description = "Negociação", example = "60") Double negotiation,
        @Schema(description = "Notificações") Notifications notifications) {
    @Builder
    public record Notifications(
            @Schema(description = "Total de notificações", example = "2") Integer total,
            @Schema(description = "Lista de mensagens") List<Message> messages,
            @Schema(description = "Lista de ações") List<Action> actions) {
        @Builder
        public record Message(
                @Schema(description = "Nome do remetente", example = "Iara") String name,
                @Schema(description = "Ação realizada", example = "Enviou um equipamento para manutenção")
                        String action,
                @Schema(description = "Número da nota fiscal", example = "00041697234") String nf,
                @Schema(description = "Data da notificação", example = "2023-10-01T12:00:00")
                        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
                        LocalDateTime date) {}

        @Builder
        public record Action(
                @Schema(description = "Título da ação", example = "Recebimento") String title,
                @Schema(
                                description = "Mensagem da ação",
                                example = "Você tem dois itens que precisam de sua atenção")
                        String message,
                @Schema(description = "Número da nota fiscal", example = "00041697234") String nf,
                @Schema(description = "Data da notificação", example = "2023-10-01T12:00:00")
                        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
                        LocalDateTime date) {}
    }
}
