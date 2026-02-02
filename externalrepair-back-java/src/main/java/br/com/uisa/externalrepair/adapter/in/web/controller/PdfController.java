package br.com.uisa.externalrepair.adapter.in.web.controller;

import br.com.uisa.externalrepair.application.domain.exception.PdfNotFoundException;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pdf")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PdfController {

    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    @GetMapping("/{nf}")
    public ResponseEntity<byte[]> getPdf(@PathVariable String nf) {
        HttpHeaders headers = new HttpHeaders();

        String bucketName = "reparo-externo";
        Bucket bucket = storage.get(bucketName);

        List<byte[]> pdfs = new ArrayList<>();

        bucket
                .list()
                .iterateAll()
                .forEach(
                        blob -> {
                            if (!blob.getName().contains("/pdfs/") || !blob.getName().contains("/" + nf + "/")) {
                                return;
                            }

                            pdfs.add(blob.getContent());

                            headers.setContentType(MediaType.parseMediaType(blob.getContentType()));
                        });

        if (pdfs.isEmpty()) {
            throw new PdfNotFoundException("Nenhum PDF encontrado para os parâmetros fornecidos.");
        }

        return new ResponseEntity<>(pdfs.getFirst(), headers, HttpStatus.OK);
    }

    @GetMapping("/partial-return-sub-item-pdf/{subItemId}")
    public ResponseEntity<byte[]> getCompleteMaintenancePdf(@PathVariable String subItemId) {
        HttpHeaders headers = new HttpHeaders();

        String bucketName = "reparo-externo";
        Bucket bucket = storage.get(bucketName);

        List<byte[]> pdfs = new ArrayList<>();

        bucket
                .list()
                .iterateAll()
                .forEach(
                        blob -> {
                            if (!blob.getName().contains("/completed-repairs/")
                                    || !blob.getName().contains("/" + subItemId + "/")) {
                                return;
                            }

                            if (pdfs.isEmpty()) {
                                pdfs.add(blob.getContent());
                                headers.set("X-Creation-Time", String.valueOf(blob.getCreateTime()));
                            } else {
                                long currentLatest = Long.parseLong(headers.getFirst("X-Creation-Time"));
                                if (blob.getCreateTime() > currentLatest) {
                                    pdfs.clear();
                                    pdfs.add(blob.getContent());
                                    headers.set("X-Creation-Time", String.valueOf(blob.getCreateTime()));
                                }
                            }

                            headers.setContentType(MediaType.parseMediaType(blob.getContentType()));
                        });

        if (pdfs.isEmpty()) {
            throw new PdfNotFoundException("Nenhum PDF encontrado para os parâmetros fornecidos.");
        }

        return new ResponseEntity<>(pdfs.getFirst(), headers, HttpStatus.OK);
    }

    @GetMapping("/partial-maintenance/{nf}")
    public ResponseEntity<byte[]> getPartialMaintenancePdf(@PathVariable String nf) {
        HttpHeaders headers = new HttpHeaders();

        String bucketName = "reparo-externo";
        Bucket bucket = storage.get(bucketName);

        List<byte[]> pdfs = new ArrayList<>();

        bucket
                .list()
                .iterateAll()
                .forEach(
                        blob -> {
                            if (!blob.getName().contains("/sub-items/")
                                    || !blob.getName().contains("/" + nf + "/")) {
                                return;
                            }

                            if (pdfs.isEmpty()) {
                                pdfs.add(blob.getContent());
                                headers.set("X-Creation-Time", String.valueOf(blob.getCreateTime()));
                            } else {
                                long currentLatest = Long.parseLong(headers.getFirst("X-Creation-Time"));
                                if (blob.getCreateTime() > currentLatest) {
                                    pdfs.clear();
                                    pdfs.add(blob.getContent());
                                    headers.set("X-Creation-Time", String.valueOf(blob.getCreateTime()));
                                }
                            }

                            headers.setContentType(MediaType.parseMediaType(blob.getContentType()));
                        });

        if (pdfs.isEmpty()) {
            throw new PdfNotFoundException("Nenhum PDF encontrado para os parâmetros fornecidos.");
        }

        return new ResponseEntity<>(pdfs.getFirst(), headers, HttpStatus.OK);
    }
}
