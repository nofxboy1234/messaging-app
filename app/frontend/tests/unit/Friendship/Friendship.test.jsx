// app/frontend/tests/unit/Friendship.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledFriendship from '../../../pages/Friendship/Friendship';
import userEvent from '@testing-library/user-event';

vi.mock('../../../pages/Profile/Link', () => ({
  default: ({ children, user, active }) => (
    <div data-testid="profile-link">
      <div>profile-link-{user.profile.username}</div>
      <div>{`profile-link-active-${active}`}</div>
      <div>{children}</div>
    </div>
  ),
}));

vi.mock('../../../pages/Friendship/Buttons/ChatButton', () => ({
  default: ({ chat }) => <button>Chat-{chat.id}</button>,
}));

vi.mock('../../../pages/Friendship/Buttons/UnfriendButton', () => ({
  default: ({ friendship, user }) => (
    <div>
      <div>unfriend-button-{user.profile.username}</div>
      <button>Unfriend-{friendship.id}</button>
    </div>
  ),
}));

describe('StyledFriendship', () => {
  const props = {
    friendship: { id: 1 },
    user: { profile: { username: 'testuser' } },
    chat: { id: 2 },
    active: true,
    handleClick: vi.fn(),
  };

  it('renders profile link, chat button and unfriend button', () => {
    render(<StyledFriendship {...props} />);
    expect(screen.getByText('profile-link-testuser')).toBeInTheDocument();
    expect(screen.getByText('profile-link-active-true')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Chat-2' })).toBeInTheDocument();
    expect(screen.getByText('unfriend-button-testuser')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Unfriend-1' }),
    ).toBeInTheDocument();
  });

  it('calls handleClick when clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<StyledFriendship {...props} />);

    await user.click(container.firstChild);

    expect(props.handleClick).toHaveBeenCalled();
  });
});
