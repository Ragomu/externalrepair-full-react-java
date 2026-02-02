import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import ScrollToTop from '.';

const mockUseLocationValue = {
  pathname: '/testRoute',
  search: '',
  hash: '',
  state: null,
};

const spyScrollTo = vi.fn();

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn().mockImplementation(() => mockUseLocationValue),
}));

describe('ScrollToTop', () => {
  beforeEach(() => {
    Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });
    Object.defineProperty(global.window, 'scrollY', { value: 1 });
    spyScrollTo.mockClear();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <ScrollToTop>
        <div>Test Content</div>
      </ScrollToTop>,
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('scrolls to top when location changes', () => {
    render(
      <ScrollToTop>
        <div>Test Content</div>
      </ScrollToTop>,
    );

    expect(spyScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('updates scroll position when location changes', () => {
    const { rerender } = render(
      <ScrollToTop>
        <div>Test Content</div>
      </ScrollToTop>,
    );

    // Simulate location change
    vi.mocked(mockUseLocationValue).pathname = '/new-route';
    rerender(
      <ScrollToTop>
        <div>Test Content</div>
      </ScrollToTop>,
    );

    expect(spyScrollTo).toHaveBeenCalledTimes(2);
  });
});
