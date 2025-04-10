// app/frontend/tests/unit/FriendRequestIndex.test.jsx
import { act, render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import StyledFriendRequestIndex from '../../pages/FriendRequest/Index';
import consumer from '../../channels/consumer';

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: { shared: { current_user: { id: 1 } } },
  }),
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

vi.mock('../../pages/FriendRequest/OutgoingFriendRequest', () => ({
  default: ({ friendRequest }) => (
    <div data-testid="outgoing">outgoing-{friendRequest.id}</div>
  ),
}));

vi.mock('../../pages/FriendRequest/IncomingFriendRequest', () => ({
  default: ({ friendRequest }) => (
    <div data-testid="incoming">incoming-{friendRequest.id}</div>
  ),
}));

describe('StyledFriendRequestIndex', () => {
  const outgoing = [{ id: 1 }, { id: 2 }];
  const incoming = [{ id: 3 }, { id: 4 }];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders outgoing and incoming friend requests', () => {
    render(
      <StyledFriendRequestIndex
        initialOutgoingFriendRequests={outgoing}
        initialIncomingFriendRequests={incoming}
      />,
    );
    expect(screen.getByText('Outgoing Friend Requests')).toBeInTheDocument();
    expect(screen.getByText('Incoming Friend Requests')).toBeInTheDocument();
    expect(screen.getAllByTestId('outgoing')).toHaveLength(2);
    expect(screen.getAllByTestId('incoming')).toHaveLength(2);
  });

  it('subscribes to the friend request channel on mount', () => {
    render(
      <StyledFriendRequestIndex
        initialOutgoingFriendRequests={outgoing}
        initialIncomingFriendRequests={incoming}
      />,
    );

    expect(consumer.subscriptions.create).toHaveBeenCalledTimes(1);
  });

  it('unsubscribes from the friend request channel on unmount', () => {
    const { unmount } = render(
      <StyledFriendRequestIndex
        initialOutgoingFriendRequests={outgoing}
        initialIncomingFriendRequests={incoming}
      />,
    );
    const sub = consumer.subscriptions.getSubscriptions()[0];

    unmount();

    expect(sub.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('renders any incoming and outgoing friend requests received on the websocket channel, appended to existing friend requests', () => {
    render(
      <StyledFriendRequestIndex
        initialOutgoingFriendRequests={outgoing}
        initialIncomingFriendRequests={incoming}
      />,
    );

    const sub = consumer.subscriptions.getSubscriptions()[0];

    act(() => {
      const data = {
        initialOutgoingFriendRequests: [{ id: 5 }],
        initialIncomingFriendRequests: [{ id: 6 }, { id: 7 }],
      };

      sub.received(data);
    });

    expect(screen.getAllByTestId('outgoing')).toHaveLength(3);
    expect(screen.getByText(/^outgoing-1$/)).toBeInTheDocument();
    expect(screen.getByText(/^outgoing-2$/)).toBeInTheDocument();
    expect(screen.getByText(/^outgoing-5$/)).toBeInTheDocument();

    expect(screen.getAllByTestId('incoming')).toHaveLength(4);
    expect(screen.getByText(/^incoming-3$/)).toBeInTheDocument();
    expect(screen.getByText(/^incoming-4$/)).toBeInTheDocument();
    expect(screen.getByText(/^incoming-6$/)).toBeInTheDocument();
    expect(screen.getByText(/^incoming-7$/)).toBeInTheDocument();
  });
});
