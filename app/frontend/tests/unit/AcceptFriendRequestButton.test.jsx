// acceptFriendRequestButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledAcceptFriendRequestButton from '../../pages/FriendRequest/Buttons/AcceptFriendRequestButton';
import { router } from '@inertiajs/react';

// Mock dependencies
vi.mock('../../pages/Buttons/Button', () => ({
  default: ({ text, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  ),
}));

// Mock Inertia's router instead of the entire api module
vi.mock('@inertiajs/react', () => {
  const routerMock = {
    visit: vi.fn((url, options) => {
      // Simulate Inertia's behavior: call onBefore if it exists
      if (options?.onBefore) {
        const shouldProceed = options.onBefore();
        if (!shouldProceed) return; // Mimic Inertia canceling the visit
      }
      // Simulate success if onFinish exists
      if (options?.onFinish) {
        options.onFinish();
      }
    }),
  };
  return {
    router: routerMock,
    usePage: () => ({ props: { shared: { current_user: { id: 1 } } } }), // For other components
  };
});

vi.mock('../../pathHelpers', () => ({
  default: {
    friendRequests: {
      destroy: ({ obj, options }) => {
        // Call Inertia's router.visit
        router.visit('some-url', options);
      },
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

  it('shows confirmation dialog and calls APIs on click when confirmed', async () => {
    const mockApi = (await import('../../pathHelpers')).default;
    render(<StyledAcceptFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByText('Accept'));

    // Check that window.confirm was called with the correct message
    expect(window.confirm).toHaveBeenCalledWith(
      'Accept friend request from testuser?',
    );
    expect(window.confirm).toHaveBeenCalledTimes(1);

    // Check that friendships.create was called
    expect(mockApi.friendships.create).toHaveBeenCalledWith({
      data: friendRequest,
    });
  });

  it('does not call friendships.create when confirmation is cancelled', async () => {
    window.confirm = vi.fn(() => false); // Mock confirm to return false
    const mockApi = (await import('../../pathHelpers')).default;
    render(<StyledAcceptFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByText('Accept'));

    expect(window.confirm).toHaveBeenCalledWith(
      'Accept friend request from testuser?',
    );
    expect(mockApi.friendships.create).not.toHaveBeenCalled();
  });
});
