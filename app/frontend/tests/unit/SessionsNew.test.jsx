// app/frontend/tests/unit/SessionsNew.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledSessionsNew from '../../pages/sessions/New';

vi.mock('@inertiajs/react', () => {
  const routerRemoveEventListener = vi.fn();

  return {
    usePage: vi.fn(() => ({
      props: { shared: { flash: {} }, errors: {} },
    })),
    router: { on: vi.fn(() => routerRemoveEventListener) },
    routerRemoveEventListener,
  };
});

vi.mock('../../pages/sessions/Buttons/LoginButton', () => ({
  default: ({ data }) => <button>Log in-{data.email}</button>,
}));

vi.mock('../../pages/sessions/Buttons/SignupButton', () => ({
  default: () => <button>Sign up</button>,
}));

describe('StyledSessionsNew', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders login form', () => {
    render(<StyledSessionsNew />);

    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in-' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  it('updates form values on input', async () => {
    render(<StyledSessionsNew />);
    const emailInput = screen.getByLabelText('Email:');

    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('adds an Inertia invalid event listener on mount', async () => {
    const mockRouter = (await import('@inertiajs/react')).router;
    render(<StyledSessionsNew />);

    expect(mockRouter.on).toHaveBeenCalledWith('invalid', expect.any(Function));
  });

  it('removes the Inertia invalid event listener on unmount', async () => {
    const mockInertia = await import('@inertiajs/react');
    const { unmount } = render(<StyledSessionsNew />);

    unmount();

    expect(mockInertia.routerRemoveEventListener).toHaveBeenCalled();
  });
});
