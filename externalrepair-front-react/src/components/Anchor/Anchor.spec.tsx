import * as helpers from '@platformbuilders/helpers';
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Anchor from '.';

vi.mock('@platformbuilders/helpers', () => ({
  isSecureLink: vi.fn(),
}));

const link = 'www.google.com.br';

describe('Anchor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    cleanup();
  });

  it('should call correct href', () => {
    const mockIsSecureLink = vi.spyOn(helpers, 'isSecureLink');

    render(<Anchor>Link Text</Anchor>);
    expect(mockIsSecureLink).toHaveBeenCalledWith('');
  });

  it('should render anchor element with children', () => {
    const { getByText } = render(<Anchor href={link}>Link Text</Anchor>);
    const linkElement = getByText('Link Text');
    expect(linkElement.tagName).toBe('A');
  });

  it('should render anchor element without href if link is not secure', () => {
    vi.spyOn(helpers, 'isSecureLink').mockReturnValue(false);

    const { getByText } = render(<Anchor href={''}>Link Text</Anchor>);
    const linkElement = getByText('Link Text');
    expect(linkElement.getAttribute('href')).toBe('');
  });

  it('should render anchor element with href if link is secure', () => {
    vi.spyOn(helpers, 'isSecureLink').mockReturnValue(true);

    const { getByText } = render(<Anchor href={link}>Link Text</Anchor>);
    const linkElement = getByText('Link Text');
    expect(linkElement.getAttribute('href')).toBe(link);
  });

  it('should pass additional attributes to the anchor element', () => {
    const { getByText } = render(
      <Anchor href={link} target="_blank">
        Link Text
      </Anchor>,
    );
    const linkElement = getByText('Link Text');
    expect(linkElement.getAttribute('target')).toBe('_blank');
  });
});
