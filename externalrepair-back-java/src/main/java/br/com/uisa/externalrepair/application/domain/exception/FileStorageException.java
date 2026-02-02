package br.com.uisa.externalrepair.application.domain.exception;

public class FileStorageException extends RuntimeException {

    public FileStorageException(String message) {
        super(message);
    }
}
