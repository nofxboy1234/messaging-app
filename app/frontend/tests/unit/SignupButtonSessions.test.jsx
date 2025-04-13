// app/frontend/tests/unit/SignupButtonSessions.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledSignupButton from '../../pages/sessions/Buttons/SignupButton';

vi.mock('../../pages/Buttons/Button', () => ({
  default: ({ text, onClick, type }) => (
    <>
      <div>{type}</div>
      <button onClick={onClick}>{text}</button>
    </>
  ),
}));

vi.mock('../../pathHelpers', () => {
  return {
    default: {
      registrations: {
        new: vi.fn(),
      },
    },
  };
});

describe('StyledSignupButton (Sessions)', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders with Sign up text', () => {
    render(<StyledSignupButton />);

    expect(screen.getByText('submit')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  it('calls API on click', async () => {
    const mockApi = (await import('../../pathHelpers')).default;
    render(<StyledSignupButton />);

    await user.click(screen.getByRole('button', { name: 'Sign up' }));

    expect(mockApi.registrations.new).toHaveBeenCalledTimes(1);
  });
});
