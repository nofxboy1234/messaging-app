import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatShow from '../../../pages/Chat/Show';

vi.mock('../../../pages/Chat/HeaderProfileLink', () => ({
  default: ({ className, children, user, active, scale = 0.7 }) => (
    <div>header: user {user.id}</div>
  ),
}));

vi.mock('../../../pages/Chat/Chat', () => ({
  default: ({ className, chat }) => <div>chat: chat {chat.id}</div>,
}));

vi.mock('../../../pages/Chat/MessageBox', () => ({
  default: ({ className, chat }) => <div>message box: chat {chat.id}</div>,
}));

describe('ChatShow', () => {
  const chat = {
    id: 1,
    members: [
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' },
    ],
  };
  const chattingWith = { id: 2, username: 'user2' };

  it('should render a header', () => {
    render(<ChatShow chat={chat} chattingWith={chattingWith} />);

    const header = screen.getByText('header: user 2');
    expect(header).toBeInTheDocument();
  });

  it('should render a chat', () => {
    render(<ChatShow chat={chat} chattingWith={chattingWith} />);

    const chatDiv = screen.getByText('chat: chat 1');
    expect(chatDiv).toBeInTheDocument();
  });

  it('should render a message box', () => {
    render(<ChatShow chat={chat} chattingWith={chattingWith} />);

    const messageBox = screen.getByText('message box: chat 1');
    expect(messageBox).toBeInTheDocument();
  });
});
