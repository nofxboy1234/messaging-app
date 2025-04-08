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
  default: ({ children, targetPath }) => <a href={targetPath}>{children}</a>,
}));

vi.mock('../../../pages/Profile/Picture', () => {
  return {
    default: ({ src }) => <img src={src} />,
  };
});

describe('ChatLink', () => {
  const defaultProps = {
    chat: { id: 1 },
    friend: {
      profile: { username: 'friend1', picture: '/path/to/picture' },
    },
  };

  it('renders a link with the correct chat path', () => {
    render(<ChatLink {...defaultProps} />);

    const link = screen.getByRole('link');
    const href = `${window.location.protocol}//${window.location.host}/path/to/chat1`;
    expect(link).toHaveProperty('href', href);
  });

  it('renders an image with the correct friend profile picture path', () => {
    render(<ChatLink {...defaultProps} />);

    const image = screen.getByRole('img');
    const href = `${window.location.protocol}//${window.location.host}/path/to/picture`;
    expect(image).toHaveProperty('src', href);
  });

  it('renders the friend username', () => {
    render(<ChatLink {...defaultProps} />);

    const username = screen.getByText('friend1');
    expect(username).toBeInTheDocument();
  });

  it('renders any children', () => {
    render(
      <ChatLink {...defaultProps}>
        <div>children</div>
      </ChatLink>,
    );

    const children = screen.getByText('children');
    expect(children).toBeInTheDocument();
  });
});
