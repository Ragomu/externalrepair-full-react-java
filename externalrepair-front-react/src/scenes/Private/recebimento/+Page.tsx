import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { StorageService } from '~/services';
import { useStore } from '~/stores';
import Receiving from './Receiving';

const ReceivingContainer = () => {
  const { receivingStore } = useStore();
  const supplierDocument = StorageService.getSupplierDocument();
  if (!supplierDocument || supplierDocument.trim() === '') {
    throw new Error(
      'Supplier document não encontrado para a requisição /recebimento.',
    );
  }
  useEffect(() => {
    receivingStore.fetchReceivedNfList(supplierDocument);
  }, []);

  return <Receiving data={receivingStore.receivedNfListTableItems} />;
};

export const Page = observer(ReceivingContainer);
