declare type ReceivedNfItemsResponse = {
  nf: string;
  items: [
    {
      id: number;
      request: string;
      material: string;
      quantity: number;
      description: string;
      subject: string;
      unitPrice: number;
      totalPrice: number;
      received: boolean;
      shippingDate: string;
    },
  ];
};

declare type ReceivedNfItem = {
  id: number;
  receivedQuantity: number;
  receiptDate: string;
};

declare type ReceivedNfListItem = {
  nf: string;
  emissionDate: string;
  issuer: string;
  receiver: string;
  totalValue: number;
  status: string;
};

declare type ReceiptItemType = {
  id: number;
  request: string;
  material: string;
  quantity: number;
  description: string;
  subject: string;
  unitPrice: number;
  totalPrice: number;
  received: boolean;
  shippingDate: string;
};

declare type ReceivingTableItem = {
  nf: string;
  emissionDate: string;
  issuer: string;
  receiver: string;
  totalQuantity: number;
  status: string;
};

declare type ReceivedNfListResponse = ReceivedNfListItem[];

declare type ReceivedNfPhotosResponse = string[];
