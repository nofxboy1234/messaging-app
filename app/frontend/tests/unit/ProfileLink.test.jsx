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
  default: ({ children, targetPath }) => <div>user link {children}</div>,
}));

vi.mock('../../pages/Profile/Picture', () => {
  return {
    default: function Picture({ src, scale }) {
      return <div>profile picture</div>;
    },
  };
});

describe('ProfileLink', () => {
  it('should render the profile picture of the user prop', () => {
    const user = { profile: { picture: 'picture url', username: 'user1' } };
    const active = true;
    const scale = 1;
    render(<ProfileLink user={user} active={active} scale={scale} />);

    const profilePicture = screen.getByText('profile picture');
    expect(profilePicture).toBeInTheDocument();
  });

  it('should render the username of the user prop', () => {
    const user = { profile: { picture: 'picture url', username: 'user1' } };
    const active = true;
    const scale = 1;
    render(<ProfileLink user={user} active={active} scale={scale} />);

    screen.debug();
    const username = screen.getByText('user1');
    expect(username).toBeInTheDocument();
  });
});
