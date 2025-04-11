// app/frontend/tests/unit/ProfileForm.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledProfileForm from '../../pages/Profile/Form';

vi.mock('@inertiajs/react', () => {
  let cached;

  return {
    useForm: (initial) => {
      if (!cached) {
        cached = initial;
      }

      return {
        data: cached,
        setData: vi.fn((key, value) => {
          cached = { ...cached, [key]: value };
        }),
        errors: {},
        processing: false,
      };
    },
  };
});

vi.mock('../../pages/Profile/Picture', () => ({
  default: ({ src }) => (
    <img src={src} alt="pic" data-testid={`picture-${src}`} />
  ),
}));

vi.mock('../../pages/Profile/Buttons/UpdateProfileButton', () => ({
  default: ({ profile }) => <button>Update</button>,
}));

vi.mock('../../pages/Profile/Buttons/ShowProfileButton', () => ({
  default: ({ profile }) => <button>Show-{profile.id}</button>,
}));

describe('StyledProfileForm', () => {
  const profile = {
    id: 1,
    username: 'testuser',
    about: 'About me',
    picture: 'pic.jpg',
  };
  const onSubmit = vi.fn();
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders form fields and buttons', () => {
    render(<StyledProfileForm profile={profile} onSubmit={onSubmit} />);
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('About me')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show-1' })).toBeInTheDocument();
    expect(screen.getByTestId('picture-pic.jpg')).toBeInTheDocument();
  });

  it.only('updates form data on input change', async () => {
    const { container } = render(
      <StyledProfileForm profile={profile} onSubmit={onSubmit} />,
    );
    const usernameInput = container.querySelector('#username');
    await user.clear(usernameInput);
    await user.type(usernameInput, 'newuser');
    expect(usernameInput).toHaveValue('newuser');
  });
});
