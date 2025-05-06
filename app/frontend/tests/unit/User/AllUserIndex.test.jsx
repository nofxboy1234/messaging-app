import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AllUserIndex from '../../../pages/User/AllUserIndex';

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: {
      shared: {
        users: [
          { id: 1, username: 'user1' },
          { id: 2, username: 'user2' },
          { id: 3, username: 'user3' },
          { id: 4, username: 'user4' },
          { id: 5, username: 'user5' },
        ],
      },
    },
  }),
}));

vi.mock('../../../hooks/useSetupAllUsers', () => ({
  default: () => [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
    { id: 3, username: 'user3' },
    { id: 4, username: 'user4' },
    { id: 5, username: 'user5' },
  ],
}));

vi.mock('../../../pages/User/Total', () => ({
  default: () => <div>user total</div>,
}));

vi.mock('../../../pages/Profile/Link', () => ({
  default: ({ user }) => <div data-testid="user">{user.username}</div>,
}));

describe('AllUserIndex', () => {
  it('should render the total user count', () => {
    render(<AllUserIndex />);

    const userTotal = screen.getByText('user total');

    expect(userTotal).toBeInTheDocument();
  });

  it('should render all the users registered in the app', () => {
    render(<AllUserIndex />);

    const user1 = screen.getByText('user1');
    const user2 = screen.getByText('user2');
    const user3 = screen.getByText('user3');
    const user4 = screen.getByText('user4');
    const user5 = screen.getByText('user5');
    const users = screen.getAllByTestId('user');

    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
    expect(user3).toBeInTheDocument();
    expect(user4).toBeInTheDocument();
    expect(user5).toBeInTheDocument();
    expect(users.length).toBe(5);
  });
});
