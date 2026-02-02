package br.com.uisa.externalrepair.application.service;

import br.com.uisa.externalrepair.adapter.out.db.repository.PersonRepository;
import br.com.uisa.externalrepair.adapter.out.db.repository.RepairRepository;
import br.com.uisa.externalrepair.application.domain.model.Person;
import br.com.uisa.externalrepair.application.domain.model.PersonType;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class VerifyDepartureDateService {

    private final RepairRepository repairRepository;
    private final EmailSenderService emailSenderService;
    private final PersonRepository personRepository;

    // formatter para datas no padrão dd/MM/yyyy
    private static final DateTimeFormatter PT_BR = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    // Constantes de texto
    private static final String SUBJECT_PREFIX = "Aviso de Vencimento: NF ";
    private static final String SUBJECT_MID = " - Reparo Externo UISA: ";
    private static final String SUBJECT_SUFFIX_30 = " - Vence em 30 dias";
    private static final String SUBJECT_SUFFIX_15 = " - Vence em 15 dias";
    private static final String SUBJECT_SUFFIX_TODAY = " - Vence hoje";

    private static final String GREETING = "Prezado(a),\n\n";
    private static final String BODY_ASSOCIATION =
            ", associada ao processo de reparo externo de número fluig: ";
    private static final String BODY_DATE_IS = ". A data de vencimento é ";
    private static final String BODY_FOOTER =
            "\n\nPor favor, verifique o status do processo. Se já foi concluído, ignore esta mensagem.\n\nAtenciosamente,";

    @Scheduled(cron = "0 0 10 * * ?")
    @Transactional
    public void verifyDepartureDate() {
        log.info("Verificando vencimento de NF dos reparos externos...");

        final LocalDate today = LocalDate.now();

        log.info("today: {}", today);

        // Carrega e-mails de fiscais uma única vez
        List<String> fiscalEmails =
                personRepository.findAllByPersonTypesContains(PersonType.FISCAL).stream()
                        .map(Person::getEmail)
                        .filter(e -> e != null && !e.isBlank())
                        .toList();

        repairRepository
                .findAll()
                .forEach(
                        repair -> {
                            LocalDate expiration = repair.getDesirableReturnDate();
                            if (expiration == null) return;

                            log.info("expiration: {}", expiration);

                            long days = ChronoUnit.DAYS.between(today, expiration);

                            log.info("days: {}", days);

                            if (days != 30 && days != 15 && days != 0) return;

                            String nf = repair.getNf();
                            String fluigNumber = repair.getFluigNumber();
                            String expirationStr = expiration.format(PT_BR);

                            String assunto = buildAssunto((int) days, nf, fluigNumber);
                            String corpo = buildCorpo((int) days, nf, fluigNumber, expirationStr);

                            Set<String> destinatarios = resolvePerfisEmails(fiscalEmails, repair);
                            if (destinatarios.isEmpty()) {
                                log.warn(
                                        "Nenhum destinatário encontrado para perfis fiscal, contraparte e gestor técnico. NF={}, FLUIG={}",
                                        nf,
                                        fluigNumber);
                                return;
                            }

                            destinatarios.forEach(
                                    email -> {
                                        log.info("email: {}", email);
                                        log.info("assunto: {}", assunto);
                                        log.info("corpo: {}", corpo);
                                        emailSenderService.sendEmail(email, assunto, corpo);
                                        try {
                                            Thread.sleep(2000L);
                                        } catch (InterruptedException ie) {
                                            Thread.currentThread().interrupt();
                                        }
                                    });
                        });
    }

    private static String buildAssunto(int dias, String nf, String fluigNumber) {
        return switch (dias) {
            case 30 -> SUBJECT_PREFIX + nf + SUBJECT_MID + fluigNumber + SUBJECT_SUFFIX_30;
            case 15 -> SUBJECT_PREFIX + nf + SUBJECT_MID + fluigNumber + SUBJECT_SUFFIX_15;
            default -> SUBJECT_PREFIX + nf + SUBJECT_MID + fluigNumber + SUBJECT_SUFFIX_TODAY;
        };
    }

    private static String buildCorpo(int dias, String nf, String fluigNumber, String expirationStr) {
        return switch (dias) {
            case 30 ->
                    GREETING
                            + "Faltam apenas 30 dias para o vencimento da Nota Fiscal "
                            + nf
                            + BODY_ASSOCIATION
                            + fluigNumber
                            + BODY_DATE_IS
                            + expirationStr
                            + "."
                            + BODY_FOOTER;
            case 15 ->
                    GREETING
                            + "Faltam apenas 15 dias para o vencimento da Nota Fiscal "
                            + nf
                            + BODY_ASSOCIATION
                            + fluigNumber
                            + BODY_DATE_IS
                            + expirationStr
                            + "."
                            + BODY_FOOTER;
            default ->
                    GREETING
                            + "Vence hoje a Nota Fiscal "
                            + nf
                            + BODY_ASSOCIATION
                            + fluigNumber
                            + BODY_DATE_IS
                            + expirationStr
                            + "."
                            + BODY_FOOTER;
        };
    }

    private Set<String> resolvePerfisEmails(List<String> fiscalEmails, Repair repair) {
        Set<String> emails = new HashSet<>();
        fiscalEmails.forEach(e -> addIfEmail(emails, e));
        if (repair.getCounterparty() != null) addIfEmail(emails, repair.getCounterparty().getEmail());
        if (repair.getTechnicalManager() != null)
            addIfEmail(emails, repair.getTechnicalManager().getEmail());
        if (repair.getSupplier() != null) addIfEmail(emails, repair.getSupplier().getEmail());
        return emails;
    }

    private static void addIfEmail(Set<String> dest, String email) {
        if (email == null) return;
        String e = email.trim();
        if (e.contains("@")) dest.add(e);
    }
}
