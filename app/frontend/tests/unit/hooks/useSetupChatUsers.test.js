import { vi, describe, it, expect } from 'vitest';
import { act, renderHook, waitFor, screen } from '@testing-library/react';

import subscribe from '../../../channels/subscriptions';

import useSetupChatUsers from '../../../hooks/useSetupChatUsers';
import { useEffect, useState } from 'react';

// vi.mock('../../../pages/Chat/HeaderProfileLink', () => ({
//   default: ({ className, children, user, active, scale = 0.7 }) => (
//     <div>{user.username}</div>
//   ),
// }));

// vi.mock('../../../pages/Chat/Chat', () => ({
//   default: ({ className, chat }) => <div>chat</div>,
// }));

// vi.mock('../../../pages/Chat/MessageBox', () => ({
//   default: ({ className, chat }) => <div>message box</div>,
// }));

vi.mock('../../../channels/subscriptions', () => {
  const subscription = {
    identifier: 1,
    unsubscribe: () => {
      console.log('mocked unsubscribe()');
    },
  };

  return {
    default: (channelName, params, receivedCallback) => {
      console.log('mocked subscribe()');
      return subscription;
    },
  };
});

// vi.mock('@inertiajs/react', () => ({
//   usePage: () => ({
//     props: {
//       shared: {
//         users: [
//           { id: 1, username: 'user1' },
//           { id: 2, username: 'user2' },
//           { id: 3, username: 'user3' },
//           { id: 4, username: 'user4' },
//         ],
//         current_user: { id: 1, username: 'user1' },
//       },
//     },
//   }),
// }));

describe('useSetupChatUsers', () => {
  it('should return an array of the initial chat users', () => {
    const initialUsers = [
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' },
    ];
    const chatId = 1;

    const { result } = renderHook(() =>
      useSetupChatUsers(initialUsers, chatId),
    );
    expect(result.current).toEqual(initialUsers);
  });

  describe('when initialUsers changes', () => {
    it.only('should return an array of the updated initial chat users', async () => {
      const initialUsers = [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' },
      ];
      const chatId = 1;

      const { result, rerender } = renderHook(
        (props = {}) => useSetupChatUsers(props.initialUsers, props.chatId),
        {
          initialProps: { initialUsers, chatId },
        },
      );
      expect(result.current).toEqual(initialUsers);

      await waitFor(() => expect(result.current).toEqual(initialUsers));

      const updatedUsers = [
        { id: 1, username: 'user1' },
        { id: 3, username: 'user3' },
      ];

      rerender({ initialUsers: updatedUsers, chatId });
      expect(result.current).toEqual(updatedUsers);
    });
  });

  // describe('when it mounts', () => {
  //   it('should set users to the users in the chat, unsubscribe from allUserChannel and subscribe to chatUserChannel', () => {
  //     render(
  //       <UsersContext.Provider value={{ setUsers, setUserChannel }}>
  //         <ChatShow chat={chat} chattingWith={chattingWith} />/
  //       </UsersContext.Provider>,
  //     );

  //     expect(setUsers).toHaveBeenCalledWith(chat.members);
  //     expect(allUserChannelMock.unsubscribe).toHaveBeenCalled();
  //     expect(chatUserChannel).toHaveBeenCalledWith({ id: 1 }, setUsers);
  //     expect(getCurrentUserChannel()).toBe(chatUserChannelMock);
  //   });
  // });

  // describe('when it unmounts', () => {
  //   it('should set users to all users, unsubscribe from chatUserChannel and subscribe to allUserChannel', () => {
  //     const { unmount } = render(
  //       <UsersContext.Provider value={{ setUsers, setUserChannel }}>
  //         <ChatShow chat={chat} chattingWith={chattingWith} />/
  //       </UsersContext.Provider>,
  //     );
  //     unmount();

  //     expect(setUsers).toHaveBeenCalledWith([
  //       { id: 1, username: 'user1' },
  //       { id: 2, username: 'user2' },
  //       { id: 3, username: 'user3' },
  //       { id: 4, username: 'user4' },
  //     ]);
  //     expect(chatUserChannelMock.unsubscribe).toHaveBeenCalled();
  //     expect(allUserChannel).toHaveBeenCalledWith(setUsers);
  //     expect(getCurrentUserChannel()).toBe(allUserChannelMock);
  //   });
  // });

  // describe('when chat.members changes', () => {
  //   it('should set users and re-subscribe to chatUserChannel', () => {
  //     const { rerender } = render(
  //       <UsersContext.Provider value={{ setUsers, setUserChannel }}>
  //         <ChatShow chat={chat} chattingWith={chattingWith} />/
  //       </UsersContext.Provider>,
  //     );

  //     const newChat = {
  //       id: 2,
  //       members: [
  //         { id: 1, username: 'user1' },
  //         { id: 3, username: 'user3' },
  //       ],
  //     };
  //     rerender(
  //       <UsersContext.Provider value={{ setUsers, setUserChannel }}>
  //         <ChatShow chat={newChat} chattingWith={chattingWith} />/
  //       </UsersContext.Provider>,
  //     );

  //     expect(setUsers).toHaveBeenCalledWith([
  //       { id: 1, username: 'user1' },
  //       { id: 2, username: 'user2' },
  //       { id: 3, username: 'user3' },
  //       { id: 4, username: 'user4' },
  //     ]);
  //     expect(chatUserChannelMock.unsubscribe).toHaveBeenCalled();
  //     expect(allUserChannel).toHaveBeenCalledWith(setUsers);

  //     expect(setUsers).toHaveBeenCalledWith(newChat.members);
  //     expect(allUserChannelMock.unsubscribe).toHaveBeenCalled();
  //     expect(chatUserChannel).toHaveBeenCalledWith({ id: 1 }, setUsers);
  //   });
  // });
});
