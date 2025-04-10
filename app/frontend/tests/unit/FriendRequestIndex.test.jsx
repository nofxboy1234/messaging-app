// app/frontend/tests/unit/FriendRequestIndex.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import StyledFriendRequestIndex from '../../pages/FriendRequest/Index';

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: { shared: { current_user: { id: 1 } } },
  }),
}));

vi.mock('../../channels/consumer', () => ({
  default: {
    subscriptions: {
      create: vi.fn(() => ({
        unsubscribe: vi.fn(),
      })),
    },
  },
}));

vi.mock('../../pages/FriendRequest/OutgoingFriendRequest', () => ({
  default: ({ friendRequest }) => (
    <div data-testid="outgoing">{friendRequest.id}</div>
  ),
}));

vi.mock('../../pages/FriendRequest/IncomingFriendRequest', () => ({
  default: ({ friendRequest }) => (
    <div data-testid="incoming">{friendRequest.id}</div>
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
});
