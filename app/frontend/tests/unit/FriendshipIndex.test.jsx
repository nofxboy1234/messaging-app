// app/frontend/tests/unit/FriendshipIndex.test.jsx
import { act, render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import consumer from '../../channels/consumer';
import StyledFriendshipIndex from '../../pages/Friendship/Index';
import userEvent from '@testing-library/user-event';

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

vi.mock('../../pages/Friendship/Friendship', () => ({
  default: ({ friendship, user, chat, active, handleClick }) => (
    <div data-testid="friendship" onClick={handleClick}>
      <div>{`friendship-${friendship.id}`}</div>
      <div>{`user-${user.id}`}</div>
      <div>{`chat-${chat.id}`}</div>
      <div>{`friendship-${friendship.id}-active-${active}`}</div>
    </div>
  ),
}));

vi.mock('../../pages/Friendship/Total', () => ({
  default: ({ friendships }) => <div>ALL FRIENDS-{friendships.length}</div>,
}));

describe('StyledFriendshipIndex', () => {
  const initialChatsWithFriends = [
    { id: 9, friendship: { id: 1 }, friend: { id: 2 } },
    { id: 10, friendship: { id: 2 }, friend: { id: 3 } },
  ];

  it('renders friendships and total', () => {
    render(
      <StyledFriendshipIndex
        initialChatsWithFriends={initialChatsWithFriends}
      />,
    );

    expect(screen.getByText('ALL FRIENDS-2')).toBeInTheDocument();
    expect(screen.getAllByTestId('friendship')).toHaveLength(2);
    expect(screen.getByText(/^friendship-1$/)).toBeInTheDocument();
    expect(screen.getByText(/^user-2$/)).toBeInTheDocument();
    expect(screen.getByText(/^chat-9$/)).toBeInTheDocument();
    expect(screen.getByText(/^friendship-2$/)).toBeInTheDocument();
    expect(screen.getByText(/^user-3$/)).toBeInTheDocument();
    expect(screen.getByText(/^chat-10$/)).toBeInTheDocument();
  });

  it('subscribes to the friendship channel on mount', () => {
    render(
      <StyledFriendshipIndex
        initialChatsWithFriends={initialChatsWithFriends}
      />,
    );

    expect(consumer.subscriptions.create).toHaveBeenCalledTimes(1);
  });

  it('unsubscribes from the friendship channel on unmount', () => {
    const { unmount } = render(
      <StyledFriendshipIndex
        initialChatsWithFriends={initialChatsWithFriends}
      />,
    );
    const sub = consumer.subscriptions.getSubscriptions()[0];

    unmount();

    expect(sub.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('updates friendships received on the websocket channel', () => {
    render(
      <StyledFriendshipIndex
        initialChatsWithFriends={initialChatsWithFriends}
      />,
    );
    const sub = consumer.subscriptions.getSubscriptions()[0];

    act(() => {
      sub.received([
        { friendship: { id: 1 }, friend: { id: 2 }, chat: { id: 9 } },
        { friendship: { id: 2 }, friend: { id: 3 }, chat: { id: 10 } },
        { friendship: { id: 3 }, friend: { id: 4 }, chat: { id: 11 } },
      ]);
    });

    expect(screen.getByText('ALL FRIENDS-3')).toBeInTheDocument();
    expect(screen.getAllByTestId('friendship')).toHaveLength(3);
    expect(screen.getByText(/^friendship-1$/)).toBeInTheDocument();
    expect(screen.getByText(/^friendship-2$/)).toBeInTheDocument();
    expect(screen.getByText(/^friendship-3$/)).toBeInTheDocument();
  });

  it('makes a friendship active when clicking on it', async () => {
    const user = userEvent.setup();
    render(
      <StyledFriendshipIndex
        initialChatsWithFriends={initialChatsWithFriends}
      />,
    );

    const friendship1 = screen.getByText(/^friendship-1$/);
    await user.click(friendship1);

    expect(screen.getByText(/^friendship-1-active-true$/)).toBeInTheDocument();
    expect(screen.getByText(/^friendship-2-active-false$/)).toBeInTheDocument();
  });

  it('has no active friendships on mount', async () => {
    render(
      <StyledFriendshipIndex
        initialChatsWithFriends={initialChatsWithFriends}
      />,
    );

    expect(screen.getByText(/^friendship-1-active-false$/)).toBeInTheDocument();
    expect(screen.getByText(/^friendship-2-active-false$/)).toBeInTheDocument();
  });
});
