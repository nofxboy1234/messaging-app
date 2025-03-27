import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserLink from '../../../pages/User/Link';

vi.mock(import('@inertiajs/react'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    usePage: () => ({ url: '' }),
  };
});

describe('UserLink', () => {
  it('should render its children into a link', () => {
    const targetPath = 'https://google.com/';
    render(<UserLink targetPath={targetPath}>hello</UserLink>);

    const link = screen.getByRole('link', { name: 'hello' });
    expect(link).toBeInTheDocument();
  });

  it('should have a link with an href equal to the provided target path', () => {
    const targetPath = 'https://google.com/';
    render(<UserLink targetPath={targetPath}>hello</UserLink>);

    const link = screen.getByRole('link', { name: 'hello' });
    expect(link).toHaveProperty('href', 'https://google.com/');
  });
});
