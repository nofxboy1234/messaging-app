import { vi, describe, it, expect } from 'vitest';
import { act, waitFor, renderHook } from '@testing-library/react';

import subscribe, { getSubscriptions } from '../../../channels/subscriptions';

import useSetupChatUsers from '../../../hooks/useSetupChatUsers';

vi.mock('../../../channels/subscriptions', () => {
  let subscriptions = [];

  const createSubscription = (params) => ({
    identifier: params.id,
    unsubscribe: vi.fn(() => {
      console.log(`mocked unsubscribe() ${params.id}`);
      subscriptions = subscriptions.filter(
        (subscription) => subscription.identifier !== params.id,
      );
      console.log('------------- subscriptions.length', subscriptions.length);
    }),
  });

  return {
    default: vi.fn((channelName, params, receivedCallback) => {
      console.log(`mocked subscribe() ${params.id}`);
      const subscription = createSubscription(params);
      subscriptions.push(subscription);
      console.log('+++++++++++++ subscriptions.length', subscriptions.length);

      return subscription;
    }),
    getSubscriptions: () => subscriptions,
  };
});

describe('useSetupChatUsers', () => {
  it('should return an array of the initial chat users', () => {
    console.log(
      '1) *************************** subscriptions.length',
      getSubscriptions().length,
    );

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
      console.log(
        '2) *************************** subscriptions.length',
        getSubscriptions().length,
      );

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
      console.log(
        '3) *************************** subscriptions.length',
        getSubscriptions().length,
      );

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
      console.log(
        '4) *************************** subscriptions.length',
        getSubscriptions().length,
      );

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
      console.log(
        '5) *************************** subscriptions.length',
        getSubscriptions().length,
      );

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

      console.log('&&&&&&&& getSubscriptions()', getSubscriptions().length);

      const subscription = getSubscriptions().find(
        (subscription) => subscription.identifier === chatId,
      );

      unmount();

      console.log('&&&&&&&& getSubscriptions()', getSubscriptions().length);
      expect(subscription.unsubscribe).toHaveBeenCalledOnce();
    });
  });
});
