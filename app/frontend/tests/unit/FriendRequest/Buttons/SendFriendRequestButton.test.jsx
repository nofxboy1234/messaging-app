import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledSendFriendRequestButton from '../../../../pages/FriendRequest/Buttons/SendFriendRequestButton';

vi.mock('../../../../pages/Buttons/Button', () => ({
  default: ({ text, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  ),
}));

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: {
      shared: { current_user: { id: 1 } },
    },
  }),
}));

vi.mock('../../../../pathHelpers/friendRequests', () => {
  const httpCreate = vi.fn(() => {});
  return {
    default: {
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
      httpCreate,
    },
  };
});

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
    expect(
      screen.getByRole('button', { name: 'Send friend request' }),
    ).toBeInTheDocument();
  });

  it('shows confirmation dialog and calls API on click when confirmed', async () => {
    const mockApi = (await import('../../../../pathHelpers/friendRequests'))
      .default;
    render(<StyledSendFriendRequestButton user={userData} />);

    await user.click(
      screen.getByRole('button', { name: 'Send friend request' }),
    );

    expect(window.confirm).toHaveBeenCalledWith(
      'Send friend request to testuser?',
    );
    expect(window.confirm).toHaveBeenCalledTimes(1);

    expect(mockApi.httpCreate).toHaveBeenCalledWith({
      user_id: 1, // from usePage().props.shared.current_user.id
      friend_id: userData.id, // from user prop
    });
    expect(mockApi.httpCreate).toHaveBeenCalledTimes(1);
  });

  it('shows confirmation dialog and does not call API on click when cancelled', async () => {
    window.confirm = vi.fn(() => false);
    const mockApi = (await import('../../../../pathHelpers/friendRequests'))
      .default;
    render(<StyledSendFriendRequestButton user={userData} />);

    await user.click(
      screen.getByRole('button', { name: 'Send friend request' }),
    );

    expect(window.confirm).toHaveBeenCalledWith(
      'Send friend request to testuser?',
    );
    expect(window.confirm).toHaveBeenCalledTimes(1);

    expect(mockApi.httpCreate).not.toHaveBeenCalled();
  });
});
