import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { router } from '@inertiajs/react';
import StyledSendFriendRequestButton from '../../pages/FriendRequest/Buttons/SendFriendRequestButton';

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
    create: ({ data, options }) => {
      router.visit('some-url', options);
    },
  },
}));

describe('StyledSendFriendRequestButton', () => {
  const userData = {
    id: 2,
    profile: { username: 'testuser' },
  };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    window.confirm = vi.fn(() => true);
  });

  it('renders with Send text', () => {
    render(<StyledSendFriendRequestButton user={userData} />);
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('shows confirmation dialog on click when confirmed', async () => {
    render(<StyledSendFriendRequestButton user={userData} />);

    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(window.confirm).toHaveBeenCalledWith(
      'Send friend request to testuser?',
    );
    expect(window.confirm).toHaveBeenCalledTimes(1);
  });

  it('does not proceed when confirmation is cancelled', async () => {
    window.confirm = vi.fn(() => false);
    render(<StyledSendFriendRequestButton user={userData} />);

    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(window.confirm).toHaveBeenCalledWith(
      'Send friend request to testuser?',
    );
  });
});
