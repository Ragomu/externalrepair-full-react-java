import { render } from '@testing-library/react';
import TextInput from '.';

describe('TextInput', () => {
  it('should render correctly with props', () => {
    render(
      <TextInput
        id="text-input"
        name="input"
        value="builder"
        type="input"
        label="input"
        onChange={() => {}}
      />,
    );

    const inputElement = document.getElementById(
      'text-input',
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.id).toBe('text-input');
    expect(inputElement.name).toBe('input');
  });
});
