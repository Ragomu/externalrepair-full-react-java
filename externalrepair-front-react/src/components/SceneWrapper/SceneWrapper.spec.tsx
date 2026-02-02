import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SceneWrapper from '.';

describe('SceneWrapper', () => {
  it('renders children correctly', () => {
    const content = 'Hello, builder!';
    const { getByTestId } = render(
      <SceneWrapper>
        <div data-testid="div-id">{content}</div>
      </SceneWrapper>,
    );
    expect(getByTestId('div-id').innerHTML).toBe(content);
  });
});
