import { FC, useEffect, useState } from 'react';
import { MessagingService } from '~/services';
import { showAlert } from '~/utils';

const NotificationsContainer: FC = () => {
  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);

  const onMessageListener = async (): Promise<void> => {
    try {
      const response = await MessagingService.onMessageListener();
      if (response?.notification) {
        const { notification } = response;
        setShow(true);
        showAlert({
          position: 'top-right',
          message: `${notification.title}: ${notification.body}`,
        });
      }
    } catch (error) {
      console.error('failed: ', error);
    }
  };

  useEffect(() => {
    if (!isTokenFound) {
      MessagingService.fetchToken(setTokenFound);
    }
  }, [isTokenFound]);

  useEffect(() => {
    if (show) {
      setShow(false);
    }
    onMessageListener();
  }, [show]);

  return null;
};

export default NotificationsContainer;
