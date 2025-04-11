// app/frontend/tests/unit/ProfileShow.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledProfileShow from '../../pages/Profile/Show';

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: { shared: { current_user: { id: 1 } } },
  }),
}));

vi.mock('../../pages/Profile/Profile', () => ({
  default: ({ initialProfile }) => <div>profile-{initialProfile.id}</div>,
}));

vi.mock('../../pages/Profile/Actions', () => ({
  default: ({ profile }) => <div>profile-actions-{profile.id}</div>,
}));

vi.mock('../../pages/User/Actions', () => ({
  default: ({
    profileUser,
    initialRelationship,
    initialFriendRequest,
    initialFriendship,
    initialChat,
  }) => (
    <div>
      <div>{`user-actions-relationship-${initialRelationship}`}</div>
      <div>{`user-actions-friendrequest-${initialFriendRequest.id}`}</div>
      <div>{`user-actions-friendship-${initialFriendship.id}`}</div>
      <div>{`user-actions-chat-${initialChat.id}`}</div>
      <div>{`user-actions-user-${profileUser.id}`}</div>
    </div>
  ),
}));

describe('StyledProfileShow', () => {
  const defaultProps = {
    profile: { id: 1, user: { id: 1 } },
    relationship: 'stranger',
    friendRequest: { id: 20 },
    friendship: { id: 21 },
    chat: { id: 22 },
  };

  it('renders profile and actions for current user', () => {
    render(<StyledProfileShow {...defaultProps} />);

    expect(screen.getByText('profile-1')).toBeInTheDocument();
    expect(screen.getByText('profile-actions-1')).toBeInTheDocument();
    expect(screen.queryAllByText('user-actions-')).toHaveLength(0);
  });

  it('renders profile and user actions for a user viewing another user profile', () => {
    const nonCurrentProfile = { id: 2, user: { id: 2 } };
    render(<StyledProfileShow {...defaultProps} profile={nonCurrentProfile} />);

    expect(screen.getByText('profile-2')).toBeInTheDocument();
    expect(
      screen.getByText('user-actions-relationship-stranger'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('user-actions-friendrequest-20'),
    ).toBeInTheDocument();
    expect(screen.getByText('user-actions-friendship-21')).toBeInTheDocument();
    expect(
      screen.getByText('user-actions-relationship-stranger'),
    ).toBeInTheDocument();
    expect(screen.getByText('user-actions-user-2')).toBeInTheDocument();
    expect(screen.queryByText('profile-actions-')).not.toBeInTheDocument();
  });
});
