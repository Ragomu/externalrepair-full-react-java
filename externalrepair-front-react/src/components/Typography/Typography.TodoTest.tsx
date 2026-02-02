import { render } from '@testing-library/react';
import Typography from '.';

describe('Typography', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <Typography data-testid="typography-component" variant="lg">
        test
      </Typography>,
    );

    const component = getByTestId('typography-component');

    expect(component).toBeInTheDocument();
    expect(getByText('test')).toBeInTheDocument();
  });
});
