// app/frontend/tests/unit/Friendship.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledFriendship from '../../pages/Friendship/Friendship';

vi.mock('../../pages/Profile/Link', () => ({
  default: ({ children }) => <div data-testid="profile-link">{children}</div>,
}));

vi.mock('../../pages/Friendship/Buttons/ChatButton', () => ({
  default: ({ chat }) => <button>Chat-{chat.id}</button>,
}));

vi.mock('../../pages/Friendship/Buttons/UnfriendButton', () => ({
  default: ({ friendship }) => <button>Unfriend-{friendship.id}</button>,
}));

describe('StyledFriendship', () => {
  const props = {
    friendship: { id: 1 },
    user: { profile: { username: 'testuser' } },
    chat: { id: 2 },
    active: true,
    handleClick: vi.fn(),
  };

  it('renders chat and unfriend buttons when active', () => {
    render(<StyledFriendship {...props} />);
    expect(screen.getByRole('button', { name: 'Chat-2' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Unfriend-1' }),
    ).toBeInTheDocument();
  });
});
