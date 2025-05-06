// app/frontend/tests/unit/LayoutContainer.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledLayoutContainer from '../../../pages/Layout';

vi.mock('@inertiajs/react', () => {
  const routerRemoveEventListener = vi.fn();

  return {
    usePage: vi.fn(() => ({
      props: { shared: { flash: {}, chats: [] }, errors: {} },
    })),
    router: { on: vi.fn(() => routerRemoveEventListener) },
    routerRemoveEventListener,
  };
});

vi.mock('../../../pages/NavBar', () => ({
  default: () => <div>NavBar</div>,
}));

vi.mock('../../../pages/Chat/Index', () => ({
  default: ({ initialChats }) => <div>ChatIndex</div>,
}));

vi.mock('../../../pages/User/Index', () => ({
  default: () => <div>UserIndex</div>,
}));

describe('StyledLayoutContainer', () => {
  it('renders layout with navbar, chats, content, and users', () => {
    render(
      <StyledLayoutContainer>
        <div>Content</div>
      </StyledLayoutContainer>,
    );
    expect(screen.getByText('NavBar')).toBeInTheDocument();
    expect(screen.getByText('ChatIndex')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('UserIndex')).toBeInTheDocument();
  });

  it('adds an Inertia invalid event listener on mount', async () => {
    const mockRouter = (await import('@inertiajs/react')).router;
    render(
      <StyledLayoutContainer>
        <div>Content</div>
      </StyledLayoutContainer>,
    );

    expect(mockRouter.on).toHaveBeenCalledWith('invalid', expect.any(Function));
  });

  it('removes the Inertia invalid event listener on unmount', async () => {
    const mockInertia = await import('@inertiajs/react');
    const { unmount } = render(
      <StyledLayoutContainer>
        <div>Content</div>
      </StyledLayoutContainer>,
    );

    unmount();

    expect(mockInertia.routerRemoveEventListener).toHaveBeenCalled();
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
    render(
      <StyledLayoutContainer>
        <div>Content</div>
      </StyledLayoutContainer>,
    );

    expect(screen.getByText('flash1')).toBeInTheDocument();
    expect(screen.getByText('flash2')).toBeInTheDocument();
    expect(screen.getByText('flash3')).toBeInTheDocument();
  });
});
