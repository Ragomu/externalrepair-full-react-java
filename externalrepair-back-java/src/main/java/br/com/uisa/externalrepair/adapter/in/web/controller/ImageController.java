package br.com.uisa.externalrepair.adapter.in.web.controller;

import br.com.uisa.externalrepair.application.domain.exception.ImageNotFoundException;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import jakarta.servlet.http.HttpServletRequest;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/images")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageController {

    private final Storage storage = StorageOptions.getDefaultInstance().getService();
    private final String bucketName = "reparo-externo";

    @GetMapping()
    public ResponseEntity<byte[]> getImage(@RequestParam String fileName) {
        Blob blob = storage.get(bucketName, fileName);

        if (blob == null) {
            throw new ImageNotFoundException(
                    "Imagem não encontrada para o nome de arquivo fornecido: " + fileName);
        }

        byte[] imageBytes = blob.getContent();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(blob.getContentType()));

        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }

    @GetMapping("/list/{supplierDocument}/{nf}")
    public ResponseEntity<List<String>> getImages(
            HttpServletRequest request, @PathVariable String supplierDocument, @PathVariable String nf) {
        Bucket bucket = storage.get(bucketName);

        String baseUrl = request.getRequestURL().toString().replace(request.getRequestURI(), "");

        List<String> imageUrls = new ArrayList<>();
        bucket
                .list()
                .iterateAll()
                .forEach(
                        blob -> {
                            if (!blob.getName()
                                    .startsWith("/received-images/" + supplierDocument + "/" + nf + "/")) {
                                return;
                            }
                            String imageUrl = baseUrl + "/images" + "?fileName=" + blob.getName();
                            imageUrls.add(imageUrl);
                        });

        return ResponseEntity.ok(imageUrls);
    }
}
