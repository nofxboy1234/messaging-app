// app/frontend/tests/unit/UserActions.test.jsx
import { act, render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import consumer from '../../../channels/consumer';
import StyledUserActions from '../../../pages/User/Actions';

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: { shared: { current_user: { id: 1 } } },
  }),
}));

vi.mock('../../../channels/consumer', () => {
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

vi.mock('../../../pages/Friendship/Buttons/ChatButton', () => ({
  default: ({ chat }) => <button>Chat</button>,
}));

vi.mock('../../../pages/Friendship/Buttons/UnfriendButton', () => ({
  default: ({ friendship, user }) => <button>Unfriend</button>,
}));

vi.mock(
  '../../../pages/FriendRequest/Buttons/AcceptFriendRequestButton',
  () => ({
    default: ({ friendRequest }) => <button>Accept</button>,
  }),
);

vi.mock(
  '../../../pages/FriendRequest/Buttons/CancelFriendRequestButton',
  () => ({
    default: ({ friendRequest }) => <button>Cancel</button>,
  }),
);

vi.mock(
  '../../../pages/FriendRequest/Buttons/RejectFriendRequestButton',
  () => ({
    default: ({ friendRequest }) => <button>Reject</button>,
  }),
);

vi.mock('../../../pages/FriendRequest/Buttons/SendFriendRequestButton', () => ({
  default: ({ user }) => <button>Send</button>,
}));

describe('StyledUserActions', () => {
  const profileUser = { id: 2, profile: { id: 2 } };

  it('renders a send button when the current user is a stranger to the viewed profile user', () => {
    render(
      <StyledUserActions
        profileUser={profileUser}
        initialRelationship="stranger"
        initialFriendRequest={undefined}
        initialFriendship={undefined}
        initialChat={undefined}
      />,
    );

    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('renders a cancel button when the current user has sent a friend request to the viewed profile user', () => {
    render(
      <StyledUserActions
        profileUser={profileUser}
        initialRelationship="outgoingRequest"
        initialFriendRequest={{ id: 99 }}
        initialFriendship={undefined}
        initialChat={undefined}
      />,
    );

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('renders accept and reject buttons when the current user has received a friend request from the viewed profile user', () => {
    render(
      <StyledUserActions
        profileUser={profileUser}
        initialRelationship="incomingRequest"
        initialFriendRequest={{ id: 98 }}
        initialFriendship={undefined}
        initialChat={undefined}
      />,
    );

    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
  });

  it('renders chat and unfriend buttons when the current user is a friend of the viewed profile user', () => {
    render(
      <StyledUserActions
        profileUser={profileUser}
        initialRelationship="friend"
        initialFriendRequest={undefined}
        initialFriendship={undefined}
        initialChat={{ id: 1 }}
      />,
    );

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

  describe('updates actions when receiving websocket data', () => {
    describe('when the current user is a stranger to the viewed profile user', () => {
      describe('and receives a friend request from them', () => {
        it('renders accept and reject buttons', () => {
          render(
            <StyledUserActions
              profileUser={profileUser}
              initialRelationship="stranger"
              initialFriendRequest={undefined}
              initialFriendship={undefined}
              initialChat={undefined}
            />,
          );
          const sub = consumer.subscriptions.getSubscriptions()[0];

          expect(
            screen.getByRole('button', { name: 'Send' }),
          ).toBeInTheDocument();

          act(() => {
            sub.received({
              relationship: 'incomingRequest',
              friendRequest: undefined,
              friendship: undefined,
              chat: undefined,
            });
          });

          expect(
            screen.getByRole('button', { name: 'Accept' }),
          ).toBeInTheDocument();
          expect(
            screen.getByRole('button', { name: 'Reject' }),
          ).toBeInTheDocument();
        });
      });
    });

    describe('when the current user has sent a friend request to the viewed profile user', () => {
      describe('and the other user rejects the request', () => {
        it('renders a send button', () => {
          render(
            <StyledUserActions
              profileUser={profileUser}
              initialRelationship="outgoingRequest"
              initialFriendRequest={undefined}
              initialFriendship={undefined}
              initialChat={undefined}
            />,
          );
          const sub = consumer.subscriptions.getSubscriptions()[0];

          expect(
            screen.getByRole('button', { name: 'Cancel' }),
          ).toBeInTheDocument();

          act(() => {
            sub.received({
              relationship: 'stranger',
              friendRequest: undefined,
              friendship: undefined,
              chat: undefined,
            });
          });

          expect(
            screen.getByRole('button', { name: 'Send' }),
          ).toBeInTheDocument();
        });
      });

      describe('and the other user accepts the request', () => {
        it('renders chat and unfriend buttons', () => {
          render(
            <StyledUserActions
              profileUser={profileUser}
              initialRelationship="outgoingRequest"
              initialFriendRequest={undefined}
              initialFriendship={undefined}
              initialChat={undefined}
            />,
          );
          const sub = consumer.subscriptions.getSubscriptions()[0];

          expect(
            screen.getByRole('button', { name: 'Cancel' }),
          ).toBeInTheDocument();

          act(() => {
            sub.received({
              relationship: 'friend',
              friendRequest: undefined,
              friendship: { id: 1 },
              chat: { id: 1 },
            });
          });

          expect(
            screen.getByRole('button', { name: 'Chat' }),
          ).toBeInTheDocument();
          expect(
            screen.getByRole('button', { name: 'Unfriend' }),
          ).toBeInTheDocument();
        });
      });
    });

    describe('when the current user has received a friend request from the viewed profile user', () => {
      describe('and the other user cancels the request', () => {
        it('renders a send button', () => {
          render(
            <StyledUserActions
              profileUser={profileUser}
              initialRelationship="incomingRequest"
              initialFriendRequest={undefined}
              initialFriendship={undefined}
              initialChat={undefined}
            />,
          );
          const sub = consumer.subscriptions.getSubscriptions()[0];

          expect(
            screen.getByRole('button', { name: 'Accept' }),
          ).toBeInTheDocument();
          expect(
            screen.getByRole('button', { name: 'Reject' }),
          ).toBeInTheDocument();

          act(() => {
            sub.received({
              relationship: 'stranger',
              friendRequest: undefined,
              friendship: undefined,
              chat: undefined,
            });
          });

          expect(
            screen.getByRole('button', { name: 'Send' }),
          ).toBeInTheDocument();
        });
      });
    });

    describe('when the current user is friends with the viewed profile user', () => {
      describe('and the other user unfriends them', () => {
        it('renders a send button', () => {
          render(
            <StyledUserActions
              profileUser={profileUser}
              initialRelationship="friend"
              initialFriendRequest={undefined}
              initialFriendship={undefined}
              initialChat={undefined}
            />,
          );
          const sub = consumer.subscriptions.getSubscriptions()[0];

          expect(
            screen.getByRole('button', { name: 'Chat' }),
          ).toBeInTheDocument();
          expect(
            screen.getByRole('button', { name: 'Unfriend' }),
          ).toBeInTheDocument();

          act(() => {
            sub.received({
              relationship: 'stranger',
              friendRequest: undefined,
              friendship: undefined,
              chat: undefined,
            });
          });

          expect(
            screen.getByRole('button', { name: 'Send' }),
          ).toBeInTheDocument();
        });
      });
    });
  });
});
