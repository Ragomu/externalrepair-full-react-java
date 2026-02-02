import React, { Fragment, useState } from 'react';
import { FormikProps, useFormikContext } from 'formik';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { UISALogo } from '~/assets';
import LoginFormInput from '~/components/LoginFormInput/LoginFormInput';
import Status from '~/utils/enums/TextInputStatus.enum';
import {
  BrandDescription,
  BrandPanel,
  BrandTextContainer,
  BrandTitle,
  ErrorMessage,
  Form,
  FormContainer,
  FormPanel,
  InputFormContainer,
  LoginHead,
  LoginScreenWrapper,
  Logo,
  LogoWrapper,
  // RecoveryButton,
  SubmitButton,
} from './styles';

function getEmailStatus(touched: any, errors: any, value: string) {
  if (touched.email) {
    if (errors.email) return Status.Failure;
    if (value) return Status.Success;
    return Status.Default;
  }
  return Status.Default;
}

function getPasswordStatus(touched: any, errors: any, value: string) {
  if (touched.password) {
    if (errors.password) return Status.Failure;
    if (value) return Status.Success;
    return Status.Default;
  }
  return Status.Default;
}

const Login: React.FC = () => {
  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange: formikHandleChange,
    handleSubmit,
    status,
    setStatus,
  }: FormikProps<AuthUser> = useFormikContext();

  const [generalError, setGeneralError] = useState<string | null>(null);

  const emailStatus = generalError
    ? Status.Failure
    : getEmailStatus(touched, errors, values.email);
  const passwordStatus = generalError
    ? Status.Failure
    : getPasswordStatus(touched, errors, values.password);

  React.useEffect(() => {
    if (status && typeof status === 'string') {
      setGeneralError(status);
    } else {
      setGeneralError(null);
    }
  }, [status]);

  const handleChange = (e: Partial<React.ChangeEvent<any>>) => {
    if (generalError) {
      setGeneralError(null);
      setStatus(null);
    }
    formikHandleChange(e);
  };

  const handleFormSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    handleSubmit(e);
  };

  const heading = 'Login';

  return (
    <Fragment>
      <LoginScreenWrapper>
        <BrandPanel>
          <BrandTextContainer>
            <BrandTitle>Reparo Externo</BrandTitle>
            <BrandDescription>
              Fornecedores conectados ao seu processo de reparo. Receba, execute
              e retorne com facilidade.
            </BrandDescription>
          </BrandTextContainer>
        </BrandPanel>

        <FormPanel>
          <FormContainer>
            <LoginHead>{heading}</LoginHead>
            {generalError && (
              <ErrorMessage>
                <ErrorOutlineRoundedIcon
                  style={{ color: '#D32F2F', fontSize: 20, flexShrink: 0 }}
                />
                <span>{generalError}</span>
              </ErrorMessage>
            )}
            <Form onSubmit={handleFormSubmit} noValidate>
              <InputFormContainer>
                {touched.email && errors.email && (
                  <ErrorMessage>{errors.email}</ErrorMessage>
                )}
                <LoginFormInput
                  placeholder="Usuário"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  status={emailStatus}
                  touched={touched.email}
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  errorMessage={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  autoComplete="username"
                />
              </InputFormContainer>

              <InputFormContainer>
                {touched.password && errors.password && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
                <LoginFormInput
                  placeholder="Senha"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  status={passwordStatus}
                  touched={touched.password}
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  errorMessage={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  autoComplete="current-password"
                />
              </InputFormContainer>
              {/* <RecoveryButton onClick={() => {}} type="button">
                Recuperar senha
              </RecoveryButton> */}

              <SubmitButton
                onPress={handleFormSubmit}
                accessibility="botão de login"
                type="submit"
                loading={isSubmitting}
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </SubmitButton>
            </Form>
          </FormContainer>
        </FormPanel>
      </LoginScreenWrapper>
      <LogoWrapper>
        <Logo src={UISALogo} alt="Logo" />
      </LogoWrapper>
    </Fragment>
  );
};

export default Login;
