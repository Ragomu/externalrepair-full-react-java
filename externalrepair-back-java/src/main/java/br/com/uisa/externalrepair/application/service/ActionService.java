package br.com.uisa.externalrepair.application.service;

import br.com.uisa.externalrepair.adapter.out.db.repository.ActionRepository;
import br.com.uisa.externalrepair.application.domain.model.Action;
import br.com.uisa.externalrepair.application.domain.model.Supplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActionService {

    private final ActionRepository actionRepository;

    public void saveAction(String title, String message, String nf, Supplier supplier) {
        var action =
                Action.builder()
                        .title(title)
                        .message(message)
                        .nf(nf)
                        .supplier(supplier)
                        .isRead(false)
                        .build();

        actionRepository.save(action);
    }
}
