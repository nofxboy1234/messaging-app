// app/frontend/tests/unit/RegistrationsNew.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledRegistrationsNew from '../../pages/registrations/New';

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

vi.mock('../../pages/registrations/Buttons/SignupButton', () => ({
  default: ({ values }) => <button>Sign up-{values.email}</button>,
}));

vi.mock('../../pages/registrations/Buttons/BackButton', () => ({
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

    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
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

  it('renders errors when an error occurs after clicking the sign-up button', async () => {
    const mockInertia = await import('@inertiajs/react');
    mockInertia.usePage.mockReturnValueOnce({
      props: { shared: { flash: {} }, errors: { email: 'email error' } },
    });
    const { container } = render(<StyledRegistrationsNew />);

    screen.debug();
    expect(container.querySelectorAll('.error')).toHaveLength(1);
  });
});
