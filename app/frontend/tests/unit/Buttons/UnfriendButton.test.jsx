// app/frontend/tests/unit/UnfriendButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledUnfriendButton from '../../../pages/Friendship/Buttons/UnfriendButton';

vi.mock('../../../pages/Buttons/Button', () => ({
  default: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

vi.mock('../../../pathHelpers/friendships', () => {
  const httpDestroy = vi.fn(() => {});
  return {
    default: {
      destroy: ({ options, obj }) => {
        if (options?.onBefore) {
          const shouldProceed = options.onBefore();
          if (!shouldProceed) return;
        }
        httpDestroy(obj);
      },
      httpDestroy,
    },
  };
});

describe('StyledUnfriendButton', () => {
  const friendship = { id: 1 };
  const friend = { profile: { username: 'testuser' } };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    window.confirm = vi.fn(() => true);
  });

  it('renders with Unfriend text', () => {
    render(<StyledUnfriendButton friendship={friendship} user={friend} />);
    expect(
      screen.getByRole('button', { name: 'Unfriend' }),
    ).toBeInTheDocument();
  });

  it('shows confirmation and calls API on click when confirmed', async () => {
    const mockApi = (await import('../../../pathHelpers/friendships')).default;
    render(<StyledUnfriendButton friendship={friendship} user={friend} />);

    await user.click(screen.getByRole('button', { name: 'Unfriend' }));

    expect(window.confirm).toHaveBeenCalledWith('Unfriend testuser?');
    expect(mockApi.httpDestroy).toHaveBeenCalledWith(friendship);
  });

  it('does not call API when confirmation is cancelled', async () => {
    window.confirm = vi.fn(() => false);
    const mockApi = (await import('../../../pathHelpers/friendships')).default;
    render(<StyledUnfriendButton friendship={friendship} user={friend} />);

    await user.click(screen.getByRole('button', { name: 'Unfriend' }));

    expect(window.confirm).toHaveBeenCalledWith('Unfriend testuser?');
    expect(mockApi.httpDestroy).not.toHaveBeenCalled();
  });
});
