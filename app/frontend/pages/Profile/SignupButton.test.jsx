// app/frontend/tests/unit/SignupButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledSignupButton from '../registrations/Buttons/SignupButton';

vi.mock('../../pages/Buttons/Button', () => ({
  default: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

vi.mock('../../pathHelpers', () => ({
  default: {
    registrations: {
      create: vi.fn(),
    },
  },
}));

describe('StyledSignupButton', () => {
  const values = { email: 'test@example.com', password: 'pass' };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders with Sign up text', () => {
    render(<StyledSignupButton values={values} />);

    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  it('calls API on click with values and options', async () => {
    const mockApi = (await import('../../pathHelpers')).default;
    render(<StyledSignupButton values={values} />);

    await user.click(screen.getByRole('button', { name: 'Sign up' }));

    expect(mockApi.registrations.create).toHaveBeenCalledTimes(1);
  });
});
