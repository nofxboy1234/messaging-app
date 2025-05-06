// app/frontend/tests/unit/EditProfileButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledEditProfileButton from '../../../pages/Profile/Buttons/EditProfileButton';

vi.mock('../../../pages/Buttons/Button', () => ({
  default: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

vi.mock('../../../pathHelpers/profiles', () => {
  const httpEdit = vi.fn(() => {});
  return {
    default: {
      edit: ({ obj }) => httpEdit(obj),
      httpEdit,
    },
  };
});

describe('StyledEditProfileButton', () => {
  const profile = { id: 1 };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders with Edit text', () => {
    render(<StyledEditProfileButton profile={profile} />);
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('calls API on click', async () => {
    const mockApi = (await import('../../../pathHelpers/profiles')).default;
    render(<StyledEditProfileButton profile={profile} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(mockApi.httpEdit).toHaveBeenCalledWith(profile);
  });
});
