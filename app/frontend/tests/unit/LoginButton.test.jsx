// app/frontend/tests/unit/LoginButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledLoginButton from '../../pages/sessions/Buttons/LoginButton';

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
      sessions: {
        create: vi.fn(),
      },
    },
  };
});

describe('StyledLoginButton', () => {
  const data = { email: 'test@example.com', password: 'pass' };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders a submit type button with Log in text', () => {
    render(<StyledLoginButton data={data} />);

    expect(screen.getByText('submit')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  it('calls API on click with data and options', async () => {
    const mockApi = (await import('../../pathHelpers')).default;
    render(<StyledLoginButton data={data} />);

    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(mockApi.sessions.create).toHaveBeenCalledWith({
      data,
      options: {
        preserveState: true,
      },
    });
  });
});
