// app/frontend/tests/unit/SessionsNew.test.jsx
import { act, render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledSessionsNew from '../../pages/sessions/New';

vi.mock('@inertiajs/react', () => {
  const routerRemoveEventListener = vi.fn();
  let routerEventListener;

  return {
    usePage: vi.fn(() => ({
      props: { shared: { flash: {} }, errors: {} },
    })),
    router: {
      on: vi.fn((type, callback) => {
        routerEventListener = callback;
        return routerRemoveEventListener;
      }),
    },
    routerRemoveEventListener,
    getRouterEventListener: () => routerEventListener,
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

  it('renders any server errors', async () => {
    const mockInertia = await import('@inertiajs/react');
    render(<StyledSessionsNew />);
    const routerEventListener = mockInertia.getRouterEventListener();

    act(() => {
      const event = {
        detail: { response: { data: 'mock server error' } },
        preventDefault: () => {},
      };
      routerEventListener(event);
    });

    expect(screen.getByText('mock server error')).toBeInTheDocument();
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
    render(<StyledSessionsNew />);

    expect(screen.getByText('flash1')).toBeInTheDocument();
    expect(screen.getByText('flash2')).toBeInTheDocument();
    expect(screen.getByText('flash3')).toBeInTheDocument();
  });
});
