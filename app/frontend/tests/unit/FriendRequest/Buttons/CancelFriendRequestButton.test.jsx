import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledCancelFriendRequestButton from '../../../../pages/FriendRequest/Buttons/CancelFriendRequestButton';

vi.mock('../../../../pages/Buttons/Button', () => ({
  default: ({ text, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  ),
}));

vi.mock('../../../../pathHelpers/friendRequests', () => {
  const httpDestroy = vi.fn(() => {});
  return {
    default: {
      destroy: ({ options, obj }) => {
        if (options?.onBefore) {
          const shouldProceed = options.onBefore();
          if (!shouldProceed) return;
        }
        httpDestroy(obj);
        if (options?.onFinish) {
          options.onFinish();
        }
      },
      httpDestroy,
    },
  };
});

describe('StyledCancelFriendRequestButton', () => {
  const friendRequest = {
    friend: { profile: { username: 'testuser' } },
  };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    window.confirm = vi.fn(() => true);
  });

  it('renders with Cancel text', () => {
    render(<StyledCancelFriendRequestButton friendRequest={friendRequest} />);
    expect(
      screen.getByRole('button', { name: 'Cancel friend request' }),
    ).toBeInTheDocument();
  });

  it('shows confirmation dialog and calls API on click when confirmed', async () => {
    const mockApi = (await import('../../../../pathHelpers/friendRequests'))
      .default;
    render(<StyledCancelFriendRequestButton friendRequest={friendRequest} />);

    await user.click(
      screen.getByRole('button', { name: 'Cancel friend request' }),
    );

    expect(window.confirm).toHaveBeenCalledWith(
      'Cancel friend request to testuser?',
    );
    expect(window.confirm).toHaveBeenCalledTimes(1);

    expect(mockApi.httpDestroy).toHaveBeenCalledWith(friendRequest);
    expect(mockApi.httpDestroy).toHaveBeenCalledTimes(1);
  });

  it('shows confirmation dialog and does not call API on click when cancelled', async () => {
    window.confirm = vi.fn(() => false);
    const mockApi = (await import('../../../../pathHelpers/friendRequests'))
      .default;
    render(<StyledCancelFriendRequestButton friendRequest={friendRequest} />);

    await user.click(
      screen.getByRole('button', { name: 'Cancel friend request' }),
    );

    expect(window.confirm).toHaveBeenCalledWith(
      'Cancel friend request to testuser?',
    );
    expect(window.confirm).toHaveBeenCalledTimes(1);

    expect(mockApi.httpDestroy).not.toHaveBeenCalled();
  });
});
