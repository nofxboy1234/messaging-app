// app/frontend/tests/unit/ShowProfileButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledShowProfileButton from '../../../pages/Profile/Buttons/ShowProfileButton';

vi.mock('../../../pages/Buttons/Button', () => ({
  default: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

vi.mock('../../../pathHelpers/profiles', () => {
  const httpShow = vi.fn(() => {});
  return {
    default: {
      show: ({ obj }) => httpShow(obj),
      httpShow,
    },
  };
});

describe('StyledShowProfileButton', () => {
  const profile = { id: 1 };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders with Show text', () => {
    render(<StyledShowProfileButton profile={profile} />);
    expect(screen.getByRole('button', { name: 'Show' })).toBeInTheDocument();
  });

  it('calls API on click', async () => {
    const mockApi = (await import('../../../pathHelpers/profiles')).default;
    render(<StyledShowProfileButton profile={profile} />);
    await user.click(screen.getByRole('button', { name: 'Show' }));
    expect(mockApi.httpShow).toHaveBeenCalledWith(profile);
  });
});
