// app/frontend/tests/unit/NavBar.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledNavBar from '../../../pages/NavBar';

vi.mock(import('@inertiajs/react'), async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    usePage: () => ({
      props: {
        shared: {
          current_user: { email: 'test@example.com' },
          profile: { id: 1 },
          session: {},
        },
      },
    }),
  };
});

vi.mock('../../../pathHelpers', () => ({
  default: {
    friendshipCategories: { index: { path: () => '/friends' } },
    chats: { index: { path: () => '/chats' } },
    users: { index: { path: () => '/users' } },
    profiles: { show: { path: () => '/profile' } },
  },
}));

vi.mock('../../../pages/Sessions/Buttons/LogoutButton', () => ({
  default: () => <button>Log out</button>,
}));

describe('StyledNavBar', () => {
  it('renders navigation links', () => {
    render(<StyledNavBar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Friends')).toBeInTheDocument();
    expect(screen.getByText('Chats')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Profile (test)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });
});
