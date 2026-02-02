export interface TimelineEvent {
  status: string;
  message: string;
  date: string;
  data?: {
    nfNumber?: string;
    [key: string]: any;
  };
}

export interface TimelineHistoryProps {
  events: TimelineEvent[];
  title?: string;
  nfNumber?: string;
}

export interface TimelineApiItem {
  status: string;
  description: string;
  date: string;
}

export interface TimelineApiResponse {
  nf: string;
  fluigNumber: string;
  items: TimelineApiItem[];
}
