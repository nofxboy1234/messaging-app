import { vi, describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import subscribe, { getSubscriptions } from '../../../channels/subscriptions';

import useSetupChatUsers from '../../../hooks/useSetupChatUsers';
import lazyMemo from '../../../helpers/vitest/lazyMemo';

vi.mock('../../../channels/subscriptions', () => {
  let subscriptions = [];

  const createSubscription = (params, receivedCallback) => ({
    identifier: params.id,
    unsubscribe: vi.fn(() => {
      subscriptions = subscriptions.filter(
        (subscription) => subscription.identifier !== params.id,
      );
    }),
    received: receivedCallback,
  });

  return {
    default: vi.fn((channelName, params, receivedCallback) => {
      const subscription = createSubscription(params, receivedCallback);
      subscriptions.push(subscription);

      return subscription;
    }),
    getSubscriptions: () => subscriptions,
  };
});

function mountForChat1() {
  const chat1 = {
    id: 1,
    members: [
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' },
    ],
  };

  const renderHookResult = renderHook(({ chat }) => useSetupChatUsers(chat), {
    initialProps: { chat: chat1 },
  });

  const chat1Sub = getSubscriptions().find(
    (subscription) => subscription.identifier === chat1.id,
  );

  return { ...renderHookResult, chat1, chat1Sub };
}

describe('useSetupChatUsers', () => {
  describe('when the component mounts with chat1', () => {
    it('should subscribe to the chat user channel with id = 1', () => {
      const value = lazyMemo(() => mountForChat1());
      value();

      expect(subscribe).toHaveBeenCalledWith(
        'ChatUserChannel',
        { id: 1 },
        expect.any(Function),
      );
    });

    it('should have subscribed a total of 1 times', () => {
      const value = lazyMemo(() => mountForChat1());
      value();

      expect(subscribe).toHaveBeenCalledOnce();
    });

    it('should have a subscription for chat1 stored', () => {
      const value = lazyMemo(() => mountForChat1());
      const { chat1Sub } = value();

      expect(getSubscriptions()).toContain(chat1Sub);
    });

    it('should return an array of the chat1 users', () => {
      const value = lazyMemo(() => mountForChat1());
      const { result, chat1 } = value();

      expect(result.current).toEqual(chat1.members);
    });

    describe('when the subscription receives an updated list of users', () => {
      it('should return an updated array of the chat1 users', () => {
        const value = lazyMemo(() => mountForChat1());
        const { result, chat1Sub } = value();

        act(() => {
          chat1Sub.received([
            { id: 1, username: 'user1' },
            { id: 2, username: 'user2' },
            { id: 99, username: 'user99' },
          ]);
        });

        expect(result.current).toEqual([
          { id: 1, username: 'user1' },
          { id: 2, username: 'user2' },
          { id: 99, username: 'user99' },
        ]);
      });
    });

    describe('when the component unmounts', () => {
      it('should unsubscribe from the chat user channel with id = 1', () => {
        const value = lazyMemo(() => mountForChat1());
        const { unmount, chat1Sub } = value();

        unmount();

        expect(chat1Sub.unsubscribe).toHaveBeenCalledOnce();
      });
    });
  });
});
