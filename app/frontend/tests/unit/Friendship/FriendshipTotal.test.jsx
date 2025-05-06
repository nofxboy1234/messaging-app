// app/frontend/tests/unit/FriendshipTotal.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledFriendshipTotal from '../../../pages/Friendship/Total';

describe('StyledFriendshipTotal', () => {
  it('renders the friendship count correctly', () => {
    const friendships = [{}, {}, {}];
    render(<StyledFriendshipTotal friendships={friendships} />);
    expect(screen.getByText('ALL FRIENDS-3')).toBeInTheDocument();
  });

  it('renders zero when friendships array is empty', () => {
    const friendships = [];
    render(<StyledFriendshipTotal friendships={friendships} />);
    expect(screen.getByText('ALL FRIENDS-0')).toBeInTheDocument();
  });
});
