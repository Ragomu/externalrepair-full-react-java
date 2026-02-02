package br.com.uisa.externalrepair.application.domain.exception;

public class PdfNotFoundException extends RuntimeException {
    public PdfNotFoundException(String message) {
        super(message);
    }
}
