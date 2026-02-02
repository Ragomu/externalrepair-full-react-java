package br.com.uisa.externalrepair.adapter.in.web.exception;

import br.com.uisa.externalrepair.application.domain.exception.FileStorageException;
import br.com.uisa.externalrepair.application.domain.exception.ImageNotFoundException;
import br.com.uisa.externalrepair.application.domain.exception.PdfNotFoundException;
import br.com.uisa.externalrepair.application.domain.exception.UnauthorizedException;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(value = {UnauthorizedException.class})
    public ResponseEntity<Void> handleUnauthorizedException(UnauthorizedException ex) {
        log.error("Erro de autenticação: {}", ex.getMessage());
        return ResponseEntity.status(401).build();
    }

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    public ResponseEntity<List<FieldErrorResponse>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        log.error("Erro de validação: {}", ex.getMessage());
        List<FieldErrorResponse> errors = new ArrayList<>();
        ex.getBindingResult()
                .getAllErrors()
                .forEach(
                        (error) -> {
                            String fieldName = ((FieldError) error).getField();
                            String errorMessage = StringUtils.capitalize(error.getDefaultMessage());
                            errors.add(new FieldErrorResponse(fieldName, errorMessage));
                        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(value = {FileStorageException.class})
    public ResponseEntity<ErrorResponse> handleException(FileStorageException ex) {
        log.error("Erro ao salvar arquivo: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.builder().message(ex.getMessage()).build());
    }

    @ExceptionHandler(value = {PdfNotFoundException.class})
    public ResponseEntity<ErrorResponse> handlePdfNotFoundException(PdfNotFoundException ex) {
        log.error("PDF não encontrado: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse.builder().message(ex.getMessage()).build());
    }

    @ExceptionHandler(value = {ImageNotFoundException.class})
    public ResponseEntity<ErrorResponse> handleImageNotFoundException(ImageNotFoundException ex) {
        log.error("Imagem não encontrada: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse.builder().message(ex.getMessage()).build());
    }
}
