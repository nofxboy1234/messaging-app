// app/frontend/tests/unit/UserIndex.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledUserIndex from '../../pages/User/Index';

vi.mock('@inertiajs/react', () => ({
  usePage: vi.fn(() => ({
    props: { chat: { id: 1 } },
  })),
}));

vi.mock('../../pages/User/ChatUserIndex', () => ({
  default: () => <div>ChatUserIndex</div>,
}));

vi.mock('../../pages/User/AllUserIndex', () => ({
  default: () => <div>AllUserIndex</div>,
}));

describe('StyledUserIndex', () => {
  it('renders ChatUserIndex when chat is present', () => {
    render(<StyledUserIndex />);

    expect(screen.getByText('ChatUserIndex')).toBeInTheDocument();
  });

  it('renders AllUserIndex when no chat', async () => {
    const mockInertia = await import('@inertiajs/react');
    mockInertia.usePage.mockReturnValueOnce({
      props: { chat: undefined },
    });
    render(<StyledUserIndex />);

    expect(screen.getByText('AllUserIndex')).toBeInTheDocument();
  });
});
