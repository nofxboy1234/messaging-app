import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatUserIndex from '../../../pages/User/ChatUserIndex';
import { usePage } from '@inertiajs/react';
import useSetupChatUsers from '../../../hooks/useSetupChatUsers';
import UserTotal from '../../../pages/User/Total';
import ProfileLink from '../../../pages/Profile/Link';

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({ props: { chat: { id: 1 } } }),
}));

vi.mock('../../../hooks/useSetupChatUsers', () => ({
  default: () => [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
  ],
}));

vi.mock('../../../pages/User/Total', () => ({
  default: () => <div>user total</div>,
}));

vi.mock('../../../pages/Profile/Link', () => ({
  default: ({ user }) => <div data-testid="user">{user.username}</div>,
}));

describe('ChatUserIndex', () => {
  it('should render the total user count', () => {
    render(<ChatUserIndex />);

    const userTotal = screen.getByText('user total');

    expect(userTotal).toBeInTheDocument();
  });

  it('should render all the users in a chat', () => {
    render(<ChatUserIndex />);

    const user1 = screen.getByText('user1');
    const user2 = screen.getByText('user2');
    const users = screen.getAllByTestId('user');

    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
    expect(users.length).toBe(2);
  });
});
