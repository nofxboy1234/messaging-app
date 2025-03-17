import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProfileLink from '../../../pages/Profile/Link';

vi.mock('../../../pathHelpers', () => {
  const show = vi.fn();
  show.path = vi.fn();

  return {
    default: { profiles: { show } },
  };
});

vi.mock('../../../pages/User/Link', () => ({
  default: ({ children, targetPath }) => <div>user link {children}</div>,
}));

vi.mock('../../../pages/Profile/Picture', () => {
  return {
    default: function Picture({ src, scale }) {
      return <div>profile picture</div>;
    },
  };
});

describe('ProfileLink', () => {
  it('should render a username', () => {
    const user = { profile: { picture: 'picture url', username: 'user1' } };
    const active = true;
    const scale = 1;
    render(<ProfileLink user={user} active={active} scale={scale} />);

    const username = screen.getByText('user1');
    expect(username).toBeInTheDocument();
  });

  it('should render any children passed to it', () => {
    const user = { profile: { picture: 'picture url', username: 'user1' } };
    const active = true;
    const scale = 1;
    render(
      <ProfileLink user={user} active={active} scale={scale}>
        <div>child 1</div>
        <div>child 2</div>
        <div>
          <div>child 3</div>
        </div>
      </ProfileLink>,
    );

    const child1 = screen.getByText('child 1');
    expect(child1).toBeInTheDocument();
    const child2 = screen.getByText('child 2');
    expect(child2).toBeInTheDocument();
    const child3 = screen.getByText('child 3');
    expect(child3).toBeInTheDocument();
  });
});
