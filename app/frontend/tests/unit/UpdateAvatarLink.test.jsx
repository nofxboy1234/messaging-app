// app/frontend/tests/unit/UpdateAvatarLink.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledUpdateAvatarLink from '../../pages/Profile/Buttons/UpdateAvatarLink';

describe('StyledUpdateAvatarLink', () => {
  it('renders update avatar link with correct href', () => {
    render(<StyledUpdateAvatarLink />);
    const link = screen.getByRole('link', { name: 'Update avatar' });
    expect(link).toHaveAttribute(
      'href',
      'https://gravatar.com/connect/?gravatar_from=signup',
    );
    expect(link).toHaveAttribute('target', '_blank');
  });
});
