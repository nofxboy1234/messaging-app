import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeaderProfileLink from '../../../pages/Chat/HeaderProfileLink';

vi.mock('../../../pages/Profile/Link', () => ({
  default: ({ children, user, active, scale }) => (
    <div>profile link {children}</div>
  ),
}));

describe('HeaderProfileLink', () => {
  it('should render any children passed to it', () => {
    const user = { profile: { picture: 'picture url', username: 'user1' } };
    const active = true;
    const scale = 1;

    render(
      <HeaderProfileLink user={user} active={active} scale={scale}>
        <div>child 1</div>
        <div>child 2</div>
        <div>
          <div>child 3</div>
        </div>
      </HeaderProfileLink>,
    );

    const child1 = screen.getByText('child 1');
    expect(child1).toBeInTheDocument();
    const child2 = screen.getByText('child 2');
    expect(child2).toBeInTheDocument();
    const child3 = screen.getByText('child 3');
    expect(child3).toBeInTheDocument();
  });
});
