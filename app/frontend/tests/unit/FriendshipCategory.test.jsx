// app/frontend/tests/unit/FriendshipCategory.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledFriendshipCategory from '../../pages/Friendship/Category';

vi.mock('../../pages/User/Link', () => ({
  default: ({ children, targetPath }) => (
    <a href={targetPath} data-testid="user-link">
      {children}
    </a>
  ),
}));

vi.mock('../../pathHelpers', () => ({
  default: {
    friendships: { index: { path: () => '/friends' } },
    friendRequests: { index: { path: () => '/pending' } },
  },
}));

describe('StyledFriendshipCategory', () => {
  it('renders friends header and links', () => {
    render(<StyledFriendshipCategory />);

    expect(screen.getByText('Friends:')).toBeInTheDocument();
    const links = screen.getAllByTestId('user-link');
    expect(links[0]).toHaveTextContent('All');
    expect(links[0]).toHaveAttribute('href', '/friends');
    expect(links[1]).toHaveTextContent('Pending');
    expect(links[1]).toHaveAttribute('href', '/pending');
  });
});
