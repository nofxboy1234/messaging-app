// acceptFriendRequestButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledAcceptFriendRequestButton from '../../../../pages/FriendRequest/Buttons/AcceptFriendRequestButton';

vi.mock('../../../../pages/Buttons/Button', () => ({
  default: ({ text, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  ),
}));

vi.mock('../../../../pathHelpers', () => {
  const httpDestroy = vi.fn(() => {});
  const httpCreate = vi.fn(() => {});

  return {
    default: {
      friendRequests: {
        httpDestroy,
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
      },
      friendships: {
        httpCreate,
        create: ({ options, data }) => {
          if (options?.onBefore) {
            const shouldProceed = options.onBefore();
            if (!shouldProceed) return;
          }

          httpCreate(data);

          if (options?.onFinish) {
            options.onFinish();
          }
        },
      },
    },
  };
});

describe('StyledAcceptFriendRequestButton', () => {
  const friendRequest = {
    user: { profile: { username: 'testuser' } },
  };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    window.confirm = vi.fn(() => true);
  });

  it('renders with Accept text', () => {
    render(<StyledAcceptFriendRequestButton friendRequest={friendRequest} />);
    expect(screen.getByText('Accept friend request')).toBeInTheDocument();
  });

  it('shows confirmation dialog and calls APIs on click when confirmed', async () => {
    const mockApi = (await import('../../../../pathHelpers')).default;
    render(<StyledAcceptFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByText('Accept friend request'));

    expect(window.confirm).toHaveBeenCalledWith(
      'Accept friend request from testuser?',
    );
    expect(window.confirm).toHaveBeenCalledTimes(1);

    expect(mockApi.friendRequests.httpDestroy).toHaveBeenCalledWith(
      friendRequest,
    );
    expect(mockApi.friendRequests.httpDestroy).toHaveBeenCalledTimes(1);

    expect(mockApi.friendships.httpCreate).toHaveBeenCalledWith(friendRequest);
    expect(mockApi.friendships.httpCreate).toHaveBeenCalledTimes(1);
  });

  it('shows confirmation dialog and does not call APIs on click when cancelled', async () => {
    window.confirm = vi.fn(() => false);
    const mockApi = (await import('../../../../pathHelpers')).default;
    render(<StyledAcceptFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByText('Accept friend request'));

    expect(window.confirm).toHaveBeenCalledWith(
      'Accept friend request from testuser?',
    );
    expect(window.confirm).toHaveBeenCalledTimes(1);

    expect(mockApi.friendRequests.httpDestroy).not.toHaveBeenCalled();
    expect(mockApi.friendships.httpCreate).not.toHaveBeenCalled();
  });
});
