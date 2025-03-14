import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserLink from '../../pages/User/Link';

describe('UserLink', () => {
  it('should render its children into a link', () => {
    const targetPath = 'https://google.com';
    render(<UserLink targetPath={targetPath}>hello</UserLink>);

    screen.debug();
    const link = screen.getByRole('link', { name: 'hello' });
    expect(link).toBeInTheDocument();
  });
});
