import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProfileLink from '../../pages/Profile/Link';

vi.mock('../../pathHelpers', () => {
  const show = vi.fn();
  show.path = vi.fn();

  return {
    default: { profiles: { show } },
  };
});

vi.mock('../../pages/User/Link', () => ({
  default: ({ targetPath }) => <div>user link</div>,
}));

describe('ProfileLink', () => {
  it('should render a UserLink', () => {
    const user = { profile: { picture: 'picture url', username: 'user1' } };
    const active = true;
    const scale = 1;
    render(<ProfileLink user={user} active={active} scale={scale} />);

    screen.debug();
    const userLink = screen.getByText('user link');
    expect(userLink).toBeInTheDocument();
  });
});
