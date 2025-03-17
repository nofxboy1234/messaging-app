import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';

import { UsersContext } from '../../pages/Layout';
import ChatShow from '../../pages/Chat/Show';
import { chatUserChannel, allUserChannel } from '../../channels/subscriptions';
import { usePage } from '@inertiajs/react';

vi.mock('../../pages/Chat/HeaderProfileLink', () => ({
  default: ({ className, children, user, active, scale = 0.7 }) => (
    <div>{user.username}</div>
  ),
}));

vi.mock('../../pages/Chat/Chat', () => ({
  default: ({ className, chat }) => <div>chat</div>,
}));

vi.mock('../../pages/Chat/MessageBox', () => ({
  default: ({ className, chat }) => <div>message box</div>,
}));

vi.mock('../../channels/subscriptions', () => {
  return {
    allUserChannel: vi.fn(() => ({ unsubscribe: vi.fn() })),
    chatUserChannel: vi.fn(() => ({ unsubscribe: vi.fn() })),
  };
});

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: {
      shared: {
        users: [
          { id: 1, username: 'user1' },
          { id: 2, username: 'user2' },
          { id: 3, username: 'user3' },
          { id: 4, username: 'user4' },
        ],
        current_user: { id: 1, username: 'user1' },
      },
    },
  }),
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
  let setUsers, setUserChannel;

  beforeEach(() => {
    setUsers = vi.fn();
    const currentUserChannel = { unsubscribe: vi.fn() };
    setUserChannel = vi.fn((fn) => fn(currentUserChannel));
  });

  describe('when it mounts', () => {
    it('should set users to the users in the chat and subscribe to chatUserChannel', () => {
      render(
        <UsersContext.Provider value={{ setUsers, setUserChannel }}>
          <ChatShow chat={chat} chattingWith={chattingWith} />/
        </UsersContext.Provider>,
      );

      expect(setUsers).toHaveBeenCalledWith(chat.members);
      expect(chatUserChannel).toHaveBeenCalledWith({ id: 1 }, setUsers);
    });
  });

  // it('should call the setUser, setUserChannel on unmount', () => {
  //   const { unmount } = render(
  //     <UsersContext.Provider
  //       value={{
  //         setUsers,
  //         setUserChannel,
  //       }}
  //     >
  //       <ChatShow chat={chat} chattingWith={chattingWith} shared={shared} />,
  //     </UsersContext.Provider>,
  //   );
  // });
});
