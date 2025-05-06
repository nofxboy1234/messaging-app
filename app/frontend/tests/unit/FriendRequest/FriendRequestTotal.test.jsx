// app/frontend/tests/unit/FriendRequestTotal.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FriendRequestTotal from '../../../pages/FriendRequest/Total';

describe('FriendRequestTotal', () => {
  it('renders the outgoing friend request count correctly', () => {
    const outgoingFriends = [{ id: 1 }, { id: 2 }];
    render(<FriendRequestTotal outgoingFriends={outgoingFriends} />);
    expect(screen.getByText('OUTGOING FRIEND REQUESTS-2')).toBeInTheDocument();
  });

  it('renders zero when outgoing friends array is empty', () => {
    const outgoingFriends = [];
    render(<FriendRequestTotal outgoingFriends={outgoingFriends} />);
    expect(screen.getByText('OUTGOING FRIEND REQUESTS-0')).toBeInTheDocument();
  });
});
