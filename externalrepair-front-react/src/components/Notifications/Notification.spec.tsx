import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { MessagingService } from '~/services';
import { showAlert } from '~/utils';
import NotificationsContainer from '.';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the services and utils
vi.mock('~/services', () => ({
  MessagingService: {
    onMessageListener: vi.fn(),
    fetchToken: vi.fn(),
  },
}));

vi.mock('~/utils', () => ({
  showAlert: vi.fn(),
}));

describe('NotificationsContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset all React mocks
    vi.restoreAllMocks();
  });

  it('should fetch token on initial render if token is not found', () => {
    // Mock useState to return specific values in sequence
    vi.spyOn(React, 'useState')
      .mockReturnValueOnce([false, vi.fn()]) // show
      .mockReturnValueOnce([true, vi.fn()]); // isTokenFound (second call)

    // Mock useEffect to execute immediately
    vi.spyOn(React, 'useEffect').mockImplementation((effect) => {
      effect();
    });

    render(<NotificationsContainer />);

    expect(MessagingService.fetchToken).toHaveBeenCalledTimes(1);
  });

  it('should show alert when a notification is received', async () => {
    const mockNotification = {
      title: 'Test Title',
      body: 'Test Body',
    };

    const mockOnMessageListener = vi
      .fn()
      .mockResolvedValueOnce({ notification: mockNotification });

    // Mock useState to return specific values
    vi.spyOn(React, 'useState')
      .mockReturnValueOnce([true, vi.fn()]) // isTokenFound
      .mockReturnValueOnce([false, vi.fn()]) // show
      .mockReturnValueOnce([true, vi.fn()]); // isTokenFound (second call)

    // Mock useEffect to execute immediately
    vi.spyOn(React, 'useEffect').mockImplementation((effect) => {
      effect();
    });

    vi.spyOn(MessagingService, 'onMessageListener').mockImplementation(
      mockOnMessageListener,
    );

    render(<NotificationsContainer />);

    await vi.waitFor(() => {
      expect(mockOnMessageListener).toHaveBeenCalled();
      expect(showAlert).toHaveBeenCalledWith({
        position: 'top-right',
        message: 'Test Title: Test Body',
      });
    });
  });

  it('should handle error when onMessageListener fails', async () => {
    const mockError = new Error('Failed to retrieve notification');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock useState to return specific values
    vi.spyOn(React, 'useState')
      .mockReturnValueOnce([true, vi.fn()]) // isTokenFound
      .mockReturnValueOnce([false, vi.fn()]) // show
      .mockReturnValueOnce([true, vi.fn()]); // isTokenFound (second call)

    // Mock useEffect to execute immediately
    vi.spyOn(React, 'useEffect').mockImplementation((effect) => {
      effect();
    });

    vi.spyOn(MessagingService, 'onMessageListener').mockRejectedValueOnce(
      mockError,
    );

    render(<NotificationsContainer />);

    await vi.waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('failed: ', mockError);
    });
  });
});
