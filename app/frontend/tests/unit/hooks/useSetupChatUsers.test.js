import { beforeEach, vi, describe, it, expect } from 'vitest';
import { act, waitFor, renderHook } from '@testing-library/react';

import subscribe, { getSubscriptions } from '../../../channels/subscriptions';

import useSetupChatUsers from '../../../hooks/useSetupChatUsers';
import lazyMemo from '../../../helpers/vitest/lazyMemo';

vi.mock('../../../channels/subscriptions', () => {
  let subscriptions = [];

  const createSubscription = (params) => ({
    identifier: params.id,
    unsubscribe: vi.fn(() => {
      subscriptions = subscriptions.filter(
        (subscription) => subscription.identifier !== params.id,
      );
    }),
  });

  return {
    default: vi.fn((channelName, params, receivedCallback) => {
      const subscription = createSubscription(params);
      subscriptions.push(subscription);

      return subscription;
    }),
    getSubscriptions: () => subscriptions,
  };
});

function mountForChat1() {
  const initialUsers = [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
  ];
  const chatId = 1;

  const renderHookResult = renderHook(
    (props = {}) => useSetupChatUsers(props.initialUsers, props.chatId),
    {
      initialProps: { initialUsers, chatId },
    },
  );

  const chat1Sub = getSubscriptions().find(
    (subscription) => subscription.identifier === chatId,
  );

  return { ...renderHookResult, initialUsers, chatId, chat1Sub };
}

function rerenderForChat2() {
  const initialUsers = [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
  ];
  const chatId = 1;

  const { result, rerender, unmount } = renderHook(
    (props = {}) => useSetupChatUsers(props.initialUsers, props.chatId),
    {
      initialProps: { initialUsers, chatId },
    },
  );

  const chat1Sub = getSubscriptions().find(
    (subscription) => subscription.identifier === chatId,
  );

  const updatedUsers = [
    { id: 1, username: 'user1' },
    { id: 3, username: 'user3' },
  ];
  const updatedChatId = 2;

  rerender({ initialUsers: updatedUsers, chatId: updatedChatId });

  const chat2Sub = getSubscriptions().find(
    (subscription) => subscription.identifier === updatedChatId,
  );

  return {
    initialUsers,
    updatedUsers,
    chatId,
    chat1Sub,
    chat2Sub,
    unmount,
    result,
  };
}

describe('useSetupChatUsers', () => {
  describe('when the component mounts with initial users = [user1, user2] and chatId = 1', () => {
    it('should subscribe to the chat user channel with id = 1', async () => {
      const value = lazyMemo(() => mountForChat1());
      value();

      expect(subscribe).toHaveBeenCalledWith(
        'ChatUserChannel',
        { id: 1 },
        expect.any(Function),
      );
    });

    it('should subscribe once', async () => {
      const value = lazyMemo(() => mountForChat1());
      value();

      expect(subscribe).toHaveBeenCalledOnce();
    });

    it('should have a total of 1 subscription', async () => {
      const value = lazyMemo(() => mountForChat1());
      value();

      expect(getSubscriptions().length).toBe(1);
    });

    it('should return an array of the initial users = [user1, user2]', () => {
      const value = lazyMemo(() => mountForChat1());
      const { result, initialUsers } = value();

      expect(result.current).toEqual(initialUsers);
    });

    describe('when initialUsers changes to [user1, user3] and chatId changes to 2', () => {
      it('should unsubscribe from the chat user channel with id = 1', async () => {
        const value = lazyMemo(() => rerenderForChat2());
        const { chat1Sub } = value();

        expect(chat1Sub.unsubscribe).toHaveBeenCalledOnce();
      });

      it('should subscribe to the chat user channel with id = 2', async () => {
        const value = lazyMemo(() => rerenderForChat2());
        value();

        expect(subscribe).toHaveBeenCalledWith(
          'ChatUserChannel',
          { id: 2 },
          expect.any(Function),
        );
      });

      it('should return an array of the updated initial users = [user1, user3]', () => {
        const value = lazyMemo(() => rerenderForChat2());
        const { result, updatedUsers } = value();

        expect(result.current).toEqual(updatedUsers);
      });

      describe('when the component unmounts', () => {
        it('should unsubscribe from the chat user channel with id = 2', async () => {
          const value = lazyMemo(() => rerenderForChat2());
          const { unmount, chat2Sub } = value();

          unmount();

          expect(chat2Sub.unsubscribe).toHaveBeenCalledOnce();
        });
      });
    });

    describe('when the component unmounts', () => {
      it('should unsubscribe from the chat user channel with id = 1', async () => {
        const value = lazyMemo(() => mountForChat1());
        const { unmount, chat1Sub } = value();

        unmount();

        expect(chat1Sub.unsubscribe).toHaveBeenCalledOnce();
      });
    });
  });
});
