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

describe('useSetupChatUsers', () => {
  describe('when the component mounts with initial users = [user1, user2] and chatId = 1', () => {
    function setup() {
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

      return { ...renderHookResult, initialUsers, chatId };
    }

    it('should subscribe to the chat user channel with id = 1', async () => {
      const value = lazyMemo(() => setup());
      value();

      expect(subscribe).toHaveBeenCalledWith(
        'ChatUserChannel',
        { id: 1 },
        expect.any(Function),
      );
    });

    it('should return an array of the initial users = [user1, user2]', () => {
      const value = lazyMemo(() => setup());
      const { result, initialUsers } = value();

      expect(result.current).toEqual(initialUsers);
    });

    describe('when initialUsers changes to [user1, user3] and chatId changes to 2', () => {
      it('should unsubscribe from the chat user channel with id = 1', async () => {
        const value = lazyMemo(() => setup());
        const { rerender, chatId } = value();

        const subscription = getSubscriptions().find(
          (subscription) => subscription.identifier === chatId,
        );

        const updatedUsers = [
          { id: 1, username: 'user1' },
          { id: 3, username: 'user3' },
        ];
        const updatedChatId = 2;

        rerender({ initialUsers: updatedUsers, chatId: updatedChatId });

        expect(subscription.unsubscribe).toHaveBeenCalledOnce();
      });

      it('should subscribe to the chat user channel with id = 2', async () => {
        const value = lazyMemo(() => setup());
        const { rerender } = value();

        const updatedUsers = [
          { id: 1, username: 'user1' },
          { id: 3, username: 'user3' },
        ];
        const updatedChatId = 2;

        rerender({ initialUsers: updatedUsers, chatId: updatedChatId });

        expect(subscribe).toHaveBeenCalledWith(
          'ChatUserChannel',
          { id: 2 },
          expect.any(Function),
        );
      });
    });

    describe('when the component unmounts', () => {
      it('should unsubscribe from the chat user channel with id = 1', async () => {
        const value = lazyMemo(() => setup());
        const { unmount, chatId } = value();

        const subscription = getSubscriptions().find(
          (subscription) => subscription.identifier === chatId,
        );

        unmount();

        expect(subscription.unsubscribe).toHaveBeenCalledOnce();
      });
    });
  });
});
