import {
  AnalyticsCallOptions,
  EventParams,
  getAnalytics,
  logEvent,
  setAnalyticsCollectionEnabled,
} from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { useSSR } from 'use-ssr';

import { firebaseConfig } from './config';
const { isBrowser } = useSSR();
let setLogEvent = (
  _eventName: string,
  _eventParams?: EventParams,
  _option?: AnalyticsCallOptions,
) => {};

initializeApp(firebaseConfig);
const analytics = isBrowser && getAnalytics();
if (isBrowser && !!analytics) {
  if (process.env.NODE_ENV === 'production') {
    setAnalyticsCollectionEnabled(analytics, true);
  } else {
    setAnalyticsCollectionEnabled(analytics, false);
  }

  setLogEvent = (
    eventName: string,
    eventParams?: EventParams,
    option?: AnalyticsCallOptions,
  ): void => {
    logEvent(analytics, eventName, eventParams, option);
  };
}

export const Analytics = {
  setLogEvent,
};
