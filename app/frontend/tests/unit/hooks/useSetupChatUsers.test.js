import { vi, describe, it, expect } from 'vitest';
import { act, waitFor, renderHook } from '@testing-library/react';

import subscribe, { unsubscribe } from '../../../channels/subscriptions';

import useSetupChatUsers from '../../../hooks/useSetupChatUsers';

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
  const unsubscribe = vi.fn(() => {
    console.log('mocked unsubscribe()');
  });

  const createSubscription = (params) => ({
    identifier: params.id,
    unsubscribe,
  });

  return {
    default: vi.fn((channelName, params, receivedCallback) => {
      console.log('mocked subscribe()');
      return createSubscription(params);
    }),
    unsubscribe,
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
    it('should return an array of the updated initial chat users', async () => {
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

      const updatedUsers = [
        { id: 1, username: 'user1' },
        { id: 3, username: 'user3' },
      ];

      rerender({ initialUsers: updatedUsers, chatId });
      expect(result.current).toEqual(updatedUsers);
    });
  });

  describe('when chatId changes', () => {
    it('should return an array of the updated initial chat users', async () => {
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

      const updatedUsers = [
        { id: 1, username: 'user1' },
        { id: 3, username: 'user3' },
      ];

      const updatedChatId = 2;

      rerender({ initialUsers: updatedUsers, chatId: updatedChatId });
      expect(result.current).toEqual(updatedUsers);
    });
  });

  describe('when the component mounts', () => {
    it('should subscribe to ChatUserChannel with the chat ID', async () => {
      const initialUsers = [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' },
      ];

      const chatId = 1;

      renderHook(
        (props = {}) => useSetupChatUsers(props.initialUsers, props.chatId),
        {
          initialProps: { initialUsers, chatId },
        },
      );
      expect(subscribe).toHaveBeenCalledOnce();
      expect(subscribe).toHaveBeenCalledWith(
        'ChatUserChannel',
        { id: 1 },
        expect.any(Function),
      );
    });
  });

  describe('when the component unmounts', () => {
    it('should unsubscribe from ChatUserChannel with the chat ID', async () => {
      const initialUsers = [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' },
      ];

      const chatId = 1;

      const { unmount } = renderHook(
        (props = {}) => useSetupChatUsers(props.initialUsers, props.chatId),
        {
          initialProps: { initialUsers, chatId },
        },
      );

      unmount();

      expect(unsubscribe).toHaveBeenCalledOnce();
    });
  });
});
