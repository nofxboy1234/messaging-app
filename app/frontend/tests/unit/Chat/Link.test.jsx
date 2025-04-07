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
  it('renders a link with the correct chat path', () => {
    const chat = { id: 1 };
    const friend = {
      profile: { username: 'friend1', picture: '/path/to/picture' },
    };
    render(<ChatLink chat={chat} friend={friend} />);

    screen.debug();
    const link = screen.getByText('/path/to/chat1');
    expect(link).toBeInTheDocument();
  });

  it('renders an image with the correct profile picture source', () => {
    const chat = { id: 1 };
    const friend = {
      profile: { username: 'friend1', picture: '/path/to/picture' },
    };
    render(<ChatLink chat={chat} friend={friend} />);

    screen.debug();
    const image = screen.getByText('/path/to/picture');
    expect(image).toBeInTheDocument();
  });

  // it('should render any children passed to it', () => {
  //   const user = { profile: { picture: 'picture url', username: 'user1' } };
  //   const active = true;
  //   const scale = 1;
  //   render(
  //     <ChatLink user={user} active={active} scale={scale}>
  //       <div>child 1</div>
  //       <div>child 2</div>
  //       <div>
  //         <div>child 3</div>
  //       </div>
  //     </ChatLink>,
  //   );

  //   const child1 = screen.getByText('child 1');
  //   expect(child1).toBeInTheDocument();
  //   const child2 = screen.getByText('child 2');
  //   expect(child2).toBeInTheDocument();
  //   const child3 = screen.getByText('child 3');
  //   expect(child3).toBeInTheDocument();
  // });
});
