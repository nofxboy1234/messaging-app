// app/frontend/tests/unit/OutgoingFriendRequest.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledOutgoingFriendRequest from '../../../pages/FriendRequest/OutgoingFriendRequest';

vi.mock('../../../pages/Profile/Link', () => ({
  default: ({ children, user }) => (
    <div data-testid="profile-link">
      {user.profile.username}
      {children}
    </div>
  ),
}));

vi.mock(
  '../../../pages/FriendRequest/Buttons/CancelFriendRequestButton',
  () => ({
    default: ({ friendRequest }) => <button>Cancel-{friendRequest.id}</button>,
  }),
);

describe('StyledOutgoingFriendRequest', () => {
  const friendRequest = {
    id: 1,
    friend: { profile: { username: 'testfriend' } },
  };

  it('renders profile link with username and cancel button', () => {
    render(<StyledOutgoingFriendRequest friendRequest={friendRequest} />);
    const profileLink = screen.getByTestId('profile-link');
    expect(profileLink).toHaveTextContent('testfriend');
    expect(
      screen.getByRole('button', { name: 'Cancel-1' }),
    ).toBeInTheDocument();
  });
});
