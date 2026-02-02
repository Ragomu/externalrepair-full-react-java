package br.com.uisa.externalrepair.adapter.in.web.dto;

import java.util.List;
import lombok.Builder;

@Builder
public record HistoryResponse(
        List<HistoryItemResponse> items, Long totalItems, Integer totalPages, Integer currentPage) {}
