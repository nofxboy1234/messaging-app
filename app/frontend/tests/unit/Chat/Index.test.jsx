import { vi, describe, it, expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import ChatIndex from '../../../pages/Chat/Index';
import consumer from '../../../channels/consumer';

vi.mock('../../../channels/consumer', async () => {
  const subscription = {
    unsubscribe: vi.fn(),
    received: null,
  };

  return {
    default: {
      subscriptions: {
        create: vi.fn((_, callbacks) => {
          subscription.received = callbacks.received;
          return subscription;
        }),
        subscriptions: [subscription],
      },
    },
  };
});

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({ props: { shared: { current_user: { id: 1 } } } }),
}));

vi.mock('../../../pages/Chat/Total', () => ({
  default: () => <div>chat total</div>,
}));

vi.mock('../../../pages/Chat/Link', () => ({
  default: ({ friend }) => <div data-testid="friend">{friend.username}</div>,
}));

describe('ChatIndex', () => {
  it('should render a chat total count', () => {
    render(
      <ChatIndex
        initialChats={[
          { id: 1, friend: { id: 2, username: 'user2' } },
          { id: 2, friend: { id: 3, username: 'user3' } },
        ]}
      />,
    );

    const userTotal = screen.getByText('chat total');

    expect(userTotal).toBeInTheDocument();
  });

  it('should render all the chats the current user is a member of', () => {
    render(
      <ChatIndex
        initialChats={[
          { id: 1, friend: { id: 2, username: 'user2' } },
          { id: 2, friend: { id: 3, username: 'user3' } },
        ]}
      />,
    );

    const friend1Chat = screen.getByText('user2');
    const friend2Chat = screen.getByText('user3');
    const friendChats = screen.getAllByTestId('friend');

    expect(friend1Chat).toBeInTheDocument();
    expect(friend2Chat).toBeInTheDocument();
    expect(friendChats.length).toBe(2);
  });

  it('should subscribe to the chats channel with id = current_user id', () => {
    render(
      <ChatIndex
        initialChats={[
          { id: 1, friend: { id: 2, username: 'user2' } },
          { id: 2, friend: { id: 3, username: 'user3' } },
        ]}
      />,
    );

    expect(consumer.subscriptions.create).toHaveBeenCalledWith(
      { channel: 'ChatChannel', id: 1 },
      expect.any(Object),
    );
  });

  it('should unsubscribe from the subscription on unmount', async () => {
    const { unmount } = render(
      <ChatIndex
        initialChats={[
          { id: 1, friend: { id: 2, username: 'user2' } },
          { id: 2, friend: { id: 3, username: 'user3' } },
        ]}
      />,
    );

    const subscription = consumer.subscriptions.subscriptions[0];
    unmount();

    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  describe('when the subscription receives updated chats', () => {
    it('should render the updated chats', () => {
      render(
        <ChatIndex
          initialChats={[
            { id: 1, friend: { id: 2, username: 'user2' } },
            { id: 2, friend: { id: 3, username: 'user3' } },
          ]}
        />,
      );

      const friendChats = screen.getAllByTestId('friend');
      expect(friendChats.length).toBe(2);

      act(() => {
        const subscription = consumer.subscriptions.subscriptions[0];
        const updatedChats = [
          { id: 1, friend: { id: 2, username: 'user2' } },
          { id: 2, friend: { id: 3, username: 'user3' } },
          { id: 3, friend: { id: 4, username: 'user4' } },
        ];
        subscription.received(updatedChats);
      });

      const friend1Chat = screen.getByText('user2');
      const friend2Chat = screen.getByText('user3');
      const friend3Chat = screen.getByText('user4');
      const updatedfriendChats = screen.getAllByTestId('friend');

      expect(friend1Chat).toBeInTheDocument();
      expect(friend2Chat).toBeInTheDocument();
      expect(friend3Chat).toBeInTheDocument();
      expect(updatedfriendChats.length).toBe(3);
    });
  });
});
