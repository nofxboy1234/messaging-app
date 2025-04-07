import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatLink from '../../../pages/Chat/Link';

vi.mock('../../../pathHelpers', () => {
  const show = () => {};
  show.path = (chat) => `/path/to/chat${chat.id}`;

  return {
    default: { chats: { show } },
  };
});

vi.mock('../../../pages/User/Link', () => ({
  default: ({ children, targetPath }) => (
    <div>
      {targetPath}
      {children}
    </div>
  ),
}));

vi.mock('../../../pages/Profile/Picture', () => {
  return {
    default: function Picture({ src }) {
      return <div>{src}</div>;
    },
  };
});

describe('ChatLink', () => {
  it('should pass the correct chat path', () => {
    const chat = { id: 1 };
    const friend = {
      profile: { username: 'friend1', picture: '/path/to/picture' },
    };
    render(<ChatLink chat={chat} friend={friend} />);

    const link = screen.getByText('/path/to/chat1');
    expect(link).toBeInTheDocument();
  });

  it('should pass the correct friend profile picture', () => {
    const chat = { id: 1 };
    const friend = {
      profile: { username: 'friend1', picture: '/path/to/picture' },
    };
    render(<ChatLink chat={chat} friend={friend} />);

    const image = screen.getByText('/path/to/picture');
    expect(image).toBeInTheDocument();
  });

  it('should render the friend username', () => {
    const chat = { id: 1 };
    const friend = {
      profile: { username: 'friend1', picture: '/path/to/picture' },
    };
    render(<ChatLink chat={chat} friend={friend} />);

    const image = screen.getByText('friend1');
    expect(image).toBeInTheDocument();
  });

  it('should render any children', () => {
    const chat = { id: 1 };
    const friend = {
      profile: { username: 'friend1', picture: '/path/to/picture' },
    };
    render(
      <ChatLink chat={chat} friend={friend}>
        <div>children</div>
      </ChatLink>,
    );

    const children = screen.getByText('children');
    expect(children).toBeInTheDocument();
  });
});
