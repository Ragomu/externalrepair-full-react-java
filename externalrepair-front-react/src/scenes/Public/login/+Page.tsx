import { FC } from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react';
import { Routes } from '~/routes';
import { navigateTo } from '~/services';
import { useStore } from '~/stores';
import Login from './Login';
import validationSchema from './validation';

const initialValues: AuthUser = {
  email: '',
  password: '',
};

const LoginContainer: FC = () => {
  const { userStore } = useStore();
  const handleFormSubmit = async (
    formValues: AuthUser,
    {
      setSubmitting,
      setStatus,
    }: {
      setSubmitting(value: boolean): void;
      setStatus: (status?: any) => void;
    },
  ): Promise<void> => {
    try {
      setSubmitting(true);
      await userStore.login(formValues.email, formValues.password);
      navigateTo(Routes.HOME);
    } catch ({ message }) {
      setStatus(message || 'E-mail ou senha incorretos!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
    >
      <Login />
    </Formik>
  );
};
export const Page = observer(LoginContainer);
