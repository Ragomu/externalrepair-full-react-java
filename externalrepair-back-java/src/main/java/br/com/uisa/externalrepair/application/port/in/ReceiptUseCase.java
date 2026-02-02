package br.com.uisa.externalrepair.application.port.in;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ReceiptUseCase {

    void handleReceiptEquipment(
            String supplierDocument, String nf, List<MultipartFile> equipmentImage);
}
