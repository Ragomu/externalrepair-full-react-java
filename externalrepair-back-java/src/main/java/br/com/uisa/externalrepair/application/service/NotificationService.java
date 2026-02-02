package br.com.uisa.externalrepair.application.service;

import br.com.uisa.externalrepair.adapter.out.db.repository.NotificationRepository;
import br.com.uisa.externalrepair.application.domain.model.Notification;
import br.com.uisa.externalrepair.application.domain.model.Person;
import br.com.uisa.externalrepair.application.domain.model.Supplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void saveNotification(Person person, String action, String nf, Supplier supplier) {
        var notification =
                Notification.builder()
                        .name(person.getName())
                        .action(action)
                        .nf(nf)
                        .isRead(false)
                        .supplier(supplier)
                        .build();

        notificationRepository.save(notification);
    }
}
