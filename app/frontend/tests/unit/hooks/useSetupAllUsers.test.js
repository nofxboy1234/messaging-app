import { vi, describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import subscribe, { getSubscriptions } from '../../../channels/subscriptions';

import useSetupAllUsers from '../../../hooks/useSetupAllUsers';
import lazyMemo from '../../../helpers/vitest/lazyMemo';

vi.mock('../../../channels/subscriptions', () => {
  let subscriptions = [];

  const createSubscription = (params, receivedCallback) => ({
    identifier: params.id,
    unsubscribe: vi.fn(() => (subscriptions = [])),
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

function mountForAllUsers() {
  const allUsers = [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
    { id: 3, username: 'user3' },
    { id: 4, username: 'user4' },
    { id: 5, username: 'user5' },
  ];

  const renderHookResult = renderHook(
    ({ initialUsers }) => useSetupAllUsers(initialUsers),
    {
      initialProps: { initialUsers: allUsers },
    },
  );

  const allUsersSub = getSubscriptions()[0];

  return { ...renderHookResult, allUsers, allUsersSub };
}

describe('useSetupChatUsers', () => {
  describe('when the component mounts with all app users', () => {
    it('should subscribe to the all user channel', () => {
      const value = lazyMemo(() => mountForAllUsers());
      value();

      expect(subscribe).toHaveBeenCalledWith(
        'AllUserChannel',
        {},
        expect.any(Function),
      );
    });

    it('should have subscribed a total of 1 times', () => {
      const value = lazyMemo(() => mountForAllUsers());
      value();

      expect(subscribe).toHaveBeenCalledOnce();
    });

    it('should have a subscription for all users stored', () => {
      const value = lazyMemo(() => mountForAllUsers());
      const { allUsersSub } = value();

      expect(getSubscriptions()).toContain(allUsersSub);
    });

    it('should return an array of all app users', () => {
      const value = lazyMemo(() => mountForAllUsers());
      const { result, allUsers } = value();

      expect(result.current).toEqual(allUsers);
    });

    describe('when the subscription receives an updated list of users', () => {
      it('should return an updated array of all app users', () => {
        const value = lazyMemo(() => mountForAllUsers());
        const { result, allUsersSub } = value();

        act(() => {
          allUsersSub.received([
            { id: 1, username: 'user1' },
            { id: 2, username: 'user2' },
            { id: 3, username: 'user3' },
            { id: 4, username: 'user4' },
            { id: 5, username: 'user5' },
            { id: 99, username: 'user99' },
          ]);
        });

        expect(result.current).toEqual([
          { id: 1, username: 'user1' },
          { id: 2, username: 'user2' },
          { id: 3, username: 'user3' },
          { id: 4, username: 'user4' },
          { id: 5, username: 'user5' },
          { id: 99, username: 'user99' },
        ]);
      });
    });

    describe('when the component unmounts', () => {
      it('should unsubscribe from the all users channel', () => {
        const value = lazyMemo(() => mountForAllUsers());
        const { unmount, allUsersSub } = value();

        unmount();

        expect(allUsersSub.unsubscribe).toHaveBeenCalledOnce();
      });
    });
  });
});
