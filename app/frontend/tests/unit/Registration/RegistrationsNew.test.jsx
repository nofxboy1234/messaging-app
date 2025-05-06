// app/frontend/tests/unit/RegistrationsNew.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledRegistrationsNew from '../../../pages/registrations/New';

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

vi.mock('../../../pages/registrations/Buttons/SignupButton', () => ({
  default: ({ values }) => <button>Sign up-{values.email}</button>,
}));

vi.mock('../../../pages/registrations/Buttons/BackButton', () => ({
  default: () => <button>Back</button>,
}));

describe('StyledRegistrationsNew', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders signup form', () => {
    render(<StyledRegistrationsNew />);

    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password confirmation:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Sign up-' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('updates form values on input', async () => {
    render(<StyledRegistrationsNew />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const passwordConfirmationInput = screen.getByLabelText(
      'Password confirmation:',
    );

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '123456');
    await user.type(passwordConfirmationInput, '654321');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('123456');
    expect(passwordConfirmationInput).toHaveValue('654321');
  });

  it('adds an Inertia invalid event listener on mount', async () => {
    const mockRouter = (await import('@inertiajs/react')).router;
    render(<StyledRegistrationsNew />);

    expect(mockRouter.on).toHaveBeenCalledWith('invalid', expect.any(Function));
  });

  it('removes the Inertia invalid event listener on unmount', async () => {
    const mockInertia = await import('@inertiajs/react');
    const { unmount } = render(<StyledRegistrationsNew />);

    unmount();

    expect(mockInertia.routerRemoveEventListener).toHaveBeenCalled();
  });

  it('renders any errors in the page context', async () => {
    const mockInertia = await import('@inertiajs/react');
    mockInertia.usePage.mockReturnValueOnce({
      props: {
        shared: { flash: {} },
        errors: {
          email: 'email error',
          password: 'password error',
          password_confirmation: 'password confirmation error',
        },
      },
    });
    const { container } = render(<StyledRegistrationsNew />);

    expect(container.querySelectorAll('.error')).toHaveLength(3);
  });

  it('renders any flash messages', async () => {
    const mockInertia = await import('@inertiajs/react');
    mockInertia.usePage.mockReturnValueOnce({
      props: {
        shared: {
          flash: { flash1: 'flash1', flash2: 'flash2', flash3: 'flash3' },
        },
        errors: {},
      },
    });
    render(<StyledRegistrationsNew />);

    expect(screen.getByText('flash1')).toBeInTheDocument();
    expect(screen.getByText('flash2')).toBeInTheDocument();
    expect(screen.getByText('flash3')).toBeInTheDocument();
  });
});
