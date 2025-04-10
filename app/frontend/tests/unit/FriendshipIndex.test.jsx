// app/frontend/tests/unit/FriendshipIndex.test.jsx
import { act, render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import consumer from '../../channels/consumer';
import StyledFriendshipIndex from '../../pages/Friendship/Index';

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: { shared: { current_user: { id: 1 } } },
  }),
  router: { on: vi.fn() },
}));

vi.mock('../../channels/consumer', () => {
  let subscriptions = [];
  const createSubscription = (params, callbacks) => ({
    identifier: params.id,
    unsubscribe: vi.fn(() => {
      subscriptions = subscriptions.filter(
        (subscription) => subscription.identifier !== params.id,
      );
    }),
    received: callbacks.received,
  });
  return {
    default: {
      subscriptions: {
        create: vi.fn((channelParams, callbacks) => {
          const subscription = createSubscription(channelParams, callbacks);
          subscriptions.push(subscription);
          return subscription;
        }),
        getSubscriptions: () => subscriptions,
      },
    },
  };
});

vi.mock('../../pages/Friendship/Friendship', () => ({
  default: ({ friendship }) => (
    <div data-testid="friendship">friendship-{friendship.id}</div>
  ),
}));

vi.mock('../../pages/Friendship/Total', () => ({
  default: ({ friendships }) => <div>ALL FRIENDS-{friendships.length}</div>,
}));

describe('StyledFriendshipIndex', () => {
  const friendships = [
    { friendship: { id: 1 }, friend: {}, chat: {} },
    { friendship: { id: 2 }, friend: {}, chat: {} },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders friendships and total', () => {
    render(<StyledFriendshipIndex initialFriendships={friendships} />);
    expect(screen.getByText('ALL FRIENDS-2')).toBeInTheDocument();
    expect(screen.getAllByTestId('friendship')).toHaveLength(2);
  });

  it('subscribes to the friendship channel on mount', () => {
    render(<StyledFriendshipIndex initialFriendships={friendships} />);
    expect(consumer.subscriptions.create).toHaveBeenCalledTimes(1);
  });

  it('unsubscribes from the friendship channel on unmount', () => {
    const { unmount } = render(
      <StyledFriendshipIndex initialFriendships={friendships} />,
    );
    const sub = consumer.subscriptions.getSubscriptions()[0];
    unmount();
    expect(sub.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('updates friendships received on the websocket channel', () => {
    render(<StyledFriendshipIndex initialFriendships={friendships} />);
    const sub = consumer.subscriptions.getSubscriptions()[0];
    act(() => {
      sub.received([{ friendship: { id: 3 }, friend: {}, chat: {} }]);
    });
    expect(screen.getByText('ALL FRIENDS-1')).toBeInTheDocument();
    expect(screen.getByText('friendship-3')).toBeInTheDocument();
  });
});
