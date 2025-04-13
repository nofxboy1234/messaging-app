// app/frontend/tests/unit/LogoutButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledLogoutButton from '../../pages/sessions/Buttons/LogoutButton';

vi.mock('../../pages/Buttons/Button', () => ({
  default: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

vi.mock('../../pathHelpers', () => {
  return {
    default: {
      sessions: {
        destroy: vi.fn(),
      },
    },
  };
});

describe('StyledLogoutButton', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders with Log out text', () => {
    render(<StyledLogoutButton />);

    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });

  it('calls API on click', async () => {
    const mockApi = (await import('../../pathHelpers')).default;
    render(<StyledLogoutButton />);

    await user.click(screen.getByRole('button', { name: 'Log out' }));

    expect(mockApi.sessions.destroy).toHaveBeenCalledTimes(1);
  });
});
