import * as Yup from 'yup';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FormContainer from '.';

const onSubmitMock = vi.fn((e) => e.preventDefault());

interface InitialValues {
  [index: string]: any;
}

describe('FormContainer', () => {
  afterEach(() => {
    cleanup();
  });
  const requiredText = 'This field is required';
  const initialValues: InitialValues = {
    email: '',
    password: '',
  };
  const validationSchema: InitialValues = Yup.object().shape({
    email: Yup.string().required(requiredText),
    password: Yup.string().required(requiredText),
  });

  beforeEach(() => {
    onSubmitMock.mockClear();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(
      <FormContainer initialValues={initialValues} onSubmit={onSubmitMock}>
        <div data-testid="form-content">Form Content</div>
      </FormContainer>,
    );
    const element = getByTestId('form-content');

    expect(element.innerHTML).toBe('Form Content');
  });

  it('should submit the form with valid values', async () => {
    const emailMock = 'test@test.com';
    const passwordMock = 'pass123';

    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitMock}
      >
        <form onSubmit={onSubmitMock}>
          <label htmlFor="email">Email</label>
          <input data-testid="email" name="email" type="email" />

          <label htmlFor="password">Password</label>
          <input data-testid="password" name="password" type="password" />

          <button data-testid="submit-data" type="submit">
            Submit
          </button>
        </form>
      </FormContainer>,
    );

    const emailInput = getByTestId('email') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;
    const submitButton = screen.getByTestId('submit-data');

    fireEvent.change(emailInput, { target: { value: emailMock } });
    fireEvent.change(passwordInput, { target: { value: passwordMock } });

    fireEvent.click(submitButton);
    expect(emailInput.value).toBe(emailMock);
    expect(passwordInput.value).toBe(passwordMock);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  it('should show validation errors when submitting the form with invalid values', async () => {
    render(
      <FormContainer
        initialValues={initialValues}
        onSubmit={onSubmitMock}
        validationSchema={validationSchema}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />

          <button type="submit">Submit</button>
        </div>
      </FormContainer>,
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button');
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });

    fireEvent.click(submitButton);

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(screen.findByText(requiredText)).toBeTruthy();
  });
});
