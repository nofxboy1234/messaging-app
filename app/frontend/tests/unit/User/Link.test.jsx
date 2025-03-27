import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserLink from '../../../pages/User/Link';

vi.mock(import('@inertiajs/react'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    // Link: ({ className, children, href }) => (
    //   <a className={className} href={href}>
    //     {children}
    //   </a>
    // ),
    usePage: () => ({ url: '' }),
  };
});

describe('UserLink', () => {
  it('should render its children into a link', () => {
    const targetPath = 'https://google.com';
    render(<UserLink targetPath={targetPath}>hello</UserLink>);

    const link = screen.getByRole('link', { name: 'hello' });
    expect(link).toBeInTheDocument();
  });
});
