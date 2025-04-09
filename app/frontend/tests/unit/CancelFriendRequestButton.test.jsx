import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { router } from '@inertiajs/react';
import StyledCancelFriendRequestButton from '../../pages/FriendRequest/Buttons/CancelFriendRequestButton';

vi.mock('../../pages/Buttons/Button', () => ({
  default: ({ text, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  ),
}));

vi.mock('@inertiajs/react', () => {
  const routerMock = {
    visit: vi.fn((url, options) => {
      if (options?.onBefore) {
        const shouldProceed = options.onBefore();
        if (!shouldProceed) return;
      }
    }),
  };
  return {
    router: routerMock,
    usePage: () => ({ props: { shared: { current_user: { id: 1 } } } }),
  };
});

vi.mock('../../pathHelpers/friendRequests', () => ({
  default: {
    destroy: ({ obj, options }) => {
      router.visit('some-url', options);
    },
  },
}));

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
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('shows confirmation dialog on click when confirmed', async () => {
    render(<StyledCancelFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(window.confirm).toHaveBeenCalledWith(
      'Cancel friend request to testuser?',
    );
    expect(window.confirm).toHaveBeenCalledTimes(1);
  });

  it('does not proceed when confirmation is cancelled', async () => {
    window.confirm = vi.fn(() => false);
    render(<StyledCancelFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(window.confirm).toHaveBeenCalledWith(
      'Cancel friend request to testuser?',
    );
  });
});
