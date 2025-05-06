// app/frontend/tests/unit/ProfileEdit.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledProfileEdit from '../../../pages/Profile/Edit';

vi.mock('../../../pages/Profile/Form', () => ({
  default: ({ profile, onSubmit, submitText }) => (
    <div>
      {`profile-${profile.id} - ${submitText}`}
      <button onClick={() => onSubmit({ transform: vi.fn(), patch: vi.fn() })}>
        Submit
      </button>
    </div>
  ),
}));

vi.mock('../../../pathHelpers/profiles', () => ({
  default: {
    update: { path: (profile) => `/profiles/${profile.id}` },
  },
}));

describe('StyledProfileEdit', () => {
  const profile = { id: 1, username: 'testuser' };

  it('renders profile form with submit text', () => {
    render(<StyledProfileEdit profile={profile} />);
    expect(screen.getByText('profile-1 - Update profile')).toBeInTheDocument();
  });
});
