// app/frontend/tests/unit/RegistrationsNew.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledRegistrationsNew from '../registrations/New';

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: { shared: { flash: {} }, errors: {} },
  }),
  router: { on: vi.fn(() => () => {}) },
}));

vi.mock('../registrations/Buttons/SignupButton', () => ({
  default: ({ values }) => <button>Sign up-{values.email}</button>,
}));

vi.mock('../registrations/Buttons/BackButton', () => ({
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
});
