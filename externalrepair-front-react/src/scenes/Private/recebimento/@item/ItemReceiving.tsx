import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import Divider from '~/components/Divider';
import ImagePreviewModal from '~/components/ImagePreviewModal';
import MainContentContainer from '~/components/MainContentContainer';
import PhotoUpload from '~/components/PhotoUpload';
import ReceiptItem from '~/components/ReceiptItem';
import {
  ReceiptHeader,
  ScrollableContainer,
} from '~/components/ReceiptItem/styles';
import SuccessReceiving from '~/components/SuccessReceiving';
import { Text } from '~/components/Typography/styles';
import { StorageService } from '~/services';
import { useStore } from '~/stores';

const ItemReceiving: FC = observer(() => {
  const { historyStore, receivingStore, maintenanceStore } = useStore();
  const item = historyStore.receivedNfDetails;
  const allReceived = item?.items.every((item) => item.received);
  const hasPhotos = receivingStore.photos.length > 0;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (item?.nf) {
      receivingStore.getNfPhotos(item.nf);
    }

    return () => {
      sessionStorage.removeItem('selectedNf');
      historyStore.clearReceivedNfDetails();
      receivingStore.clearPhotos();
    };
  }, [item?.nf]);

  return (
    <MainContentContainer
      title="Recebimento"
      actionArea={false}
      userName={StorageService.getUserData()?.name || ''}
      goBack={true}
      icon="approval_delegation"
    >
      {receivingStore.hasJustFinished ? (
        <>
          <Divider />
          <SuccessReceiving />
        </>
      ) : (
        <>
          <ReceiptHeader>
            <Text variant="title">
              NF-e {item?.nf} - Nº referencia:{' '}
              {maintenanceStore.maintenanceNfItems?.fluigNumber || ''}
            </Text>
          </ReceiptHeader>
          <ScrollableContainer>
            {item?.items.map((itemUnit) => (
              <ReceiptItem
                key={itemUnit.id}
                item={itemUnit}
                allItemsReceived={allReceived || false}
                hasPhotos={hasPhotos}
                onSave={async () => {
                  await receivingStore.updateReceivedNfItem(item.nf, {
                    id: itemUnit.id,
                    receivedQuantity: itemUnit.quantity,
                    receiptDate: itemUnit.shippingDate,
                  });
                  await historyStore.fetchReceivedNfItems(item.nf);
                }}
              />
            ))}
            {allReceived && <PhotoUpload onView={openModal} />}

            {isModalOpen && (
              <ImagePreviewModal
                files={receivingStore.photos}
                onClose={closeModal}
              />
            )}
          </ScrollableContainer>
        </>
      )}
    </MainContentContainer>
  );
});

export default ItemReceiving;
