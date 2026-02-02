import { Dispatch, SetStateAction } from 'react';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  MessagePayload,
  getMessaging,
  getToken,
  onMessage,
} from 'firebase/messaging';
import { useSSR } from 'use-ssr';

import { FIREBASE_VAPID_KEY } from '~/utils';
import { firebaseConfig } from './config';

const { isBrowser } = useSSR();

export const firebaseApp = getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const messaging = isBrowser && getMessaging(firebaseApp);
let fetchToken = async (
  _setTokenFound: Dispatch<SetStateAction<boolean>>,
): Promise<void> => {};
let onMessageListener = (): Promise<MessagePayload | void> =>
  new Promise<MessagePayload>((resolve) => resolve);
if (isBrowser && !!messaging) {
  fetchToken = async (
    setTokenFound: Dispatch<SetStateAction<boolean>>,
  ): Promise<void> => {
    try {
      const token = await getToken(messaging, {
        vapidKey: FIREBASE_VAPID_KEY,
      }); // get this here: Firebase / Project Settings / Cloud Messaging / Web Push Certificates
      if (token) {
        console.log('current token for client: ', token);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.',
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    } catch (error) {
      console.error('An error occurred while retrieving token. ', error);
      // catch error while creating client token
    }
  };

  onMessageListener = (): Promise<MessagePayload> =>
    new Promise<MessagePayload>((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });
}
export const MessagingService = {
  onMessageListener,
  fetchToken,
};
