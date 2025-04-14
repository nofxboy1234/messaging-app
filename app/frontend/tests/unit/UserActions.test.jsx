// app/frontend/tests/unit/UserActions.test.jsx
import { act, render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import consumer from '../../channels/consumer';
import StyledUserActions from '../../pages/User/Actions';

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: { shared: { current_user: { id: 1 } } },
  }),
}));

vi.mock('../../channels/consumer', () => {
  let subscriptions = [];
  const createSubscription = (params, callbacks) => ({
    identifier: `${params.profile_id}-${params.current_user_id}`,
    unsubscribe: vi.fn(() => {
      subscriptions = subscriptions.filter(
        (subscription) =>
          subscription.identifier !==
          `${params.profile_id}-${params.current_user_id}`,
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

vi.mock('../../pages/Friendship/Buttons/ChatButton', () => ({
  default: ({ chat }) => <button>Chat</button>,
}));

vi.mock('../../pages/Friendship/Buttons/UnfriendButton', () => ({
  default: ({ friendship, user }) => <button>Unfriend</button>,
}));

vi.mock('../../pages/FriendRequest/Buttons/AcceptFriendRequestButton', () => ({
  default: ({ friendRequest }) => <button>Accept</button>,
}));

vi.mock('../../pages/FriendRequest/Buttons/CancelFriendRequestButton', () => ({
  default: ({ friendRequest }) => <button>Cancel</button>,
}));

vi.mock('../../pages/FriendRequest/Buttons/RejectFriendRequestButton', () => ({
  default: ({ friendRequest }) => <button>Reject</button>,
}));

vi.mock('../../pages/FriendRequest/Buttons/SendFriendRequestButton', () => ({
  default: ({ user }) => <button>Send</button>,
}));

describe('StyledUserActions', () => {
  const profileUser = { id: 2, profile: { id: 2 } };

  it('renders friend actions when the viewing user is a friend of the viewed profile user', () => {
    render(
      <StyledUserActions
        profileUser={profileUser}
        initialRelationship="friend"
        initialFriendRequest={undefined}
        initialFriendship={undefined}
        initialChat={{ id: 1 }}
      />,
    );

    screen.debug();
    expect(screen.getByRole('button', { name: 'Chat' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Unfriend' }),
    ).toBeInTheDocument();
  });

  it('subscribes to the relationship channel on mount', () => {
    render(
      <StyledUserActions
        profileUser={profileUser}
        initialRelationship="friend"
        initialFriendRequest={undefined}
        initialFriendship={undefined}
        initialChat={{ id: 1 }}
      />,
    );

    expect(consumer.subscriptions.create).toHaveBeenCalledTimes(1);
  });

  it('unsubscribes from the relationship channel on unmount', () => {
    const { unmount } = render(
      <StyledUserActions
        profileUser={profileUser}
        initialRelationship="friend"
        initialFriendRequest={undefined}
        initialFriendship={undefined}
        initialChat={{ id: 1 }}
      />,
    );
    const sub = consumer.subscriptions.getSubscriptions()[0];

    unmount();

    expect(sub.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('updates actions on websocket data', () => {
    render(
      <StyledUserActions
        profileUser={profileUser}
        initialRelationship="friend"
        initialFriendRequest={undefined}
        initialFriendship={undefined}
        initialChat={{ id: 1 }}
      />,
    );
    const sub = consumer.subscriptions.getSubscriptions()[0];

    act(() => {
      sub.received({
        relationship: 'incomingRequest',
        friendRequest: undefined,
        friendship: undefined,
        chat: undefined,
      });
    });

    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
  });
});
