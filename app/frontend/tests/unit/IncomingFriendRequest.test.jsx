// app/frontend/tests/unit/IncomingFriendRequest.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledIncomingFriendRequest from '../../pages/FriendRequest/IncomingFriendRequest';

vi.mock('../../pages/Profile/Link', () => ({
  default: ({ children, user }) => (
    <div data-testid="profile-link">
      {user.profile.username}
      {children}
    </div>
  ),
}));

vi.mock('../../pages/FriendRequest/Buttons/AcceptFriendRequestButton', () => ({
  default: () => <button>Accept</button>,
}));

vi.mock('../../pages/FriendRequest/Buttons/RejectFriendRequestButton', () => ({
  default: () => <button>Reject</button>,
}));

describe('StyledIncomingFriendRequest', () => {
  const friendRequest = {
    user: { profile: { username: 'testuser' } },
  };

  it('renders profile link with username and buttons', () => {
    render(<StyledIncomingFriendRequest friendRequest={friendRequest} />);
    const profileLink = screen.getByTestId('profile-link');
    expect(profileLink).toHaveTextContent('testuser');
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
  });
});
