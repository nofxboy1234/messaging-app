// app/frontend/tests/unit/ProfileActions.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledProfileActions from '../../pages/Profile/Actions';

vi.mock('../../pages/Profile/Buttons/EditProfileButton', () => ({
  default: ({ profile }) => <button>Edit-{profile.id}</button>,
}));

vi.mock('../../pages/Profile/Buttons/UpdateAvatarLink', () => ({
  default: () => <a href="#">Update avatar</a>,
}));

describe('StyledProfileActions', () => {
  const profile = { id: 1 };

  it('renders edit button and update avatar link', () => {
    render(<StyledProfileActions profile={profile} />);
    expect(screen.getByRole('button', { name: 'Edit-1' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Update avatar' }),
    ).toBeInTheDocument();
  });
});
