package br.com.uisa.externalrepair.adapter.in.web.controller.maintenance;

import br.com.uisa.externalrepair.adapter.in.web.dto.AdditionalNfResponse;
import br.com.uisa.externalrepair.adapter.out.db.repository.AdditionalNfRepository;
import br.com.uisa.externalrepair.application.domain.exception.PdfNotFoundException;
import br.com.uisa.externalrepair.application.domain.model.AdditionalNf;
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

@Slf4j
@RequiredArgsConstructor
@RestController()
@RequestMapping("/additional-nfs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdditionalNfListController {

    private final Storage storage = StorageOptions.getDefaultInstance().getService();
    private final String bucketName = "reparo-externo";

    private final AdditionalNfRepository additionalNfRepository;

    @GetMapping("/{nf}")
    public ResponseEntity<List<AdditionalNfResponse>> getImages(
            HttpServletRequest request, @PathVariable String nf) {

        Bucket bucket = storage.get(bucketName);

        String baseUrl = request.getRequestURL().toString().replace(request.getRequestURI(), "");

        List<String> imageUrls = new ArrayList<>();
        bucket
                .list()
                .iterateAll()
                .forEach(
                        blob -> {
                            if (!blob.getName().contains(nf + "/additionalNfs/")) {
                                return;
                            }
                            String imageUrl = baseUrl + "/additional-nfs" + "?fileName=" + blob.getName();
                            imageUrls.add(imageUrl);
                        });

        List<AdditionalNf> repairs = additionalNfRepository.findAllByRepairNf(nf);

        List<AdditionalNfResponse> additionalNfResponses = new ArrayList<>();

        repairs.forEach(
                additionalNf ->
                        imageUrls.stream()
                                .filter(url -> url.contains("/additionalNfs/" + additionalNf.getNfNumber() + "/"))
                                .distinct()
                                .forEach(
                                        url ->
                                                additionalNfResponses.add(
                                                        AdditionalNfResponse.builder()
                                                                .nfNumber(additionalNf.getNfNumber())
                                                                .nfLink(url)
                                                                .build())));

        return ResponseEntity.ok(additionalNfResponses);
    }

    @GetMapping()
    public ResponseEntity<byte[]> getImage(@RequestParam String fileName) {
        Blob blob = storage.get(bucketName, fileName);

        if (blob == null) {
            throw new PdfNotFoundException("Nenhum PDF encontrado para os parâmetros fornecidos.");
        }

        byte[] pdfBytes = blob.getContent();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(blob.getContentType()));

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}
