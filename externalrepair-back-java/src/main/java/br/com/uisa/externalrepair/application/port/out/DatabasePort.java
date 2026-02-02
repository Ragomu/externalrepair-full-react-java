package br.com.uisa.externalrepair.application.port.out;

import br.com.uisa.externalrepair.application.domain.model.Item;
import br.com.uisa.externalrepair.application.domain.model.Logistic;
import br.com.uisa.externalrepair.application.domain.model.Person;
import br.com.uisa.externalrepair.application.domain.model.Photo;
import br.com.uisa.externalrepair.application.domain.model.Repair;
import br.com.uisa.externalrepair.application.domain.model.Status;
import br.com.uisa.externalrepair.application.domain.model.StatusName;
import br.com.uisa.externalrepair.application.domain.model.Supplier;
import br.com.uisa.externalrepair.application.domain.model.Warehouse;
import java.time.LocalDate;

public interface DatabasePort {

    void saveRequest(Repair repair);

    void saveItem(Item item);

    void saveSupplier(Supplier supplier);

    Boolean existsSupplierByDocument(String document);

    void savePerson(Person person);

    void saveWarehouse(Warehouse warehouse);

    void saveLogistic(Logistic logistic);

    Photo savePhoto(Photo photo);

    Status findStatusByName(StatusName statusName);

    void updateReceiptDateAndPhotoAndStatus(String request, StatusName statusName);

    void updateOrderNumberAndStatus(String request, String orderNumber, StatusName statusName);

    void updatePhotoAndStatus(String request, Long photoId, String statusName);

    void updateItemsReceivedQuantity(String request, Integer receivedQuantity, LocalDate receiptDate);

    void updatePhotoRepair(Long photoId, String request);
}
