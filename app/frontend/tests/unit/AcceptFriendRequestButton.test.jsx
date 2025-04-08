// acceptFriendRequestButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledAcceptFriendRequestButton from '../../pages/FriendRequest/Buttons/AcceptFriendRequestButton';

// Mock dependencies
vi.mock('../../pages/Buttons/Button', () => ({
  default: ({ text, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  ),
}));

vi.mock('../../pathHelpers', () => ({
  default: {
    friendRequests: {
      destroy: vi.fn(),
    },
    friendships: {
      create: vi.fn(),
    },
  },
}));

describe('StyledAcceptFriendRequestButton', () => {
  const friendRequest = {
    user: { profile: { username: 'testuser' } },
  };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    window.confirm = vi.fn(() => true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with Accept text', () => {
    render(<StyledAcceptFriendRequestButton friendRequest={friendRequest} />);
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it.only('shows confirmation dialog and calls APIs on click when confirmed', async () => {
    const mockApi = (await import('../../pathHelpers')).default;
    render(<StyledAcceptFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByText('Accept'));

    expect(window.confirm).toHaveBeenCalledWith(
      'Accept friend request from testuser?',
    );
    expect(mockApi.friendRequests.destroy).toHaveBeenCalledWith({
      obj: friendRequest,
      options: expect.objectContaining({
        onBefore: expect.any(Function),
        onFinish: expect.any(Function),
      }),
    });
    expect(mockApi.friendships.create).toHaveBeenCalledWith({
      data: friendRequest,
    });
  });

  it('does not call APIs when confirmation is cancelled', async () => {
    window.confirm = vi.fn(() => false);
    const mockApi = (await import('../../pathHelpers')).default;
    render(<StyledAcceptFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByText('Accept'));

    expect(mockApi.friendRequests.destroy).not.toHaveBeenCalled();
    expect(mockApi.friendships.create).not.toHaveBeenCalled();
  });
});
