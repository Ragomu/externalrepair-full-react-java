import * as Toastify from 'react-toastify';
import { Text } from '~/components/Typography/styles';

type AlertMessage = string | string[] | Element | Element[];
type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';
type TypePosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

type ShowAlertProps = {
  message: AlertMessage;
  type?: TypeOptions;
  position?: TypePosition;
};

const Msg = ({ message }: any): JSX.Element => (
  <Text variant="body" color="var(--color-text-main)">
    {message}
  </Text>
);

export const showAlert = ({
  message,
  type = 'error',
  position = 'top-right',
  ...rest
}: ShowAlertProps): void => {
  try {
    Toastify.toast(<Msg message={message} />, {
      type,
      position,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: `var(--color-${type}-light)`,
      },
      ...rest,
    });
  } finally {
    return;
  }
};

export default showAlert;
