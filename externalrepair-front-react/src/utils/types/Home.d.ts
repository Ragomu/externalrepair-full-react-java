declare type HomeNotificationMessage = {
  name: string;
  action: string;
  request: string;
};

declare type HomeNotificationAction = {
  title: string;
  message: string;
  request: string;
};

declare type HomeNotifications = {
  total: number;
  messages: HomeNotificationMessage[];
  actions: HomeNotificationAction[];
};

declare type HomeResponse = {
  maintenance: number;
  maintenanceVariation: number;
  transit: number;
  negotiation: number;
  notifications: HomeNotifications;
};

declare type HistoryItem = {
  nf: string;
  material: string;
  description: string;
  totalValue: string;
  status: string;
  departureDate: string;
};

declare type HistoryResponse = {
  totalItems: number;
  actualPage: number;
  totalPages: number;
  items: HistoryItem[];
};

declare type GetHomeFilters = {
  maintenanceType?: string;
  transitType?: string;
  negotiationType?: string;
};

declare type HistoryItemResponse = {
  nf: string;
  emissionDate: string;
  issuer: string;
  receiver: string;
  totalValue: number;
  status: string;
};

declare type HistoryResponse = {
  items: HistoryItemResponse[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
};
