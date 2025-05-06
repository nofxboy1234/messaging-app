// app/frontend/tests/unit/ProfileForm.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledProfileForm from '../../../pages/Profile/Form';
import { useState } from 'react';

vi.mock('@inertiajs/react', () => {
  return {
    useForm: (initial) => {
      const [formData, setFormData] = useState(initial);

      return {
        data: formData,
        setData: (key, value) => {
          setFormData((formData) => ({ ...formData, [key]: value }));
        },
        errors: {},
        processing: false,
      };
    },
  };
});

vi.mock('../../../pages/Profile/Picture', () => ({
  default: ({ src, scale }) => (
    <div>
      <div>{`picture-scale-${scale}`}</div>
      <img src={src} alt="pic" data-testid={`picture-${src}`} />
    </div>
  ),
}));

vi.mock('../../../pages/Profile/Buttons/UpdateProfileButton', () => ({
  default: ({ onSubmit, form }) => (
    <div>
      <div>{`update-${form.data.username}`}</div>
      <button onClick={onSubmit}>Update</button>
    </div>
  ),
}));

vi.mock('../../../pages/Profile/Buttons/ShowProfileButton', () => ({
  default: ({ profile }) => <button>Show-{profile.id}</button>,
}));

describe('StyledProfileForm', () => {
  const profile = {
    id: 1,
    username: 'testuser',
    about: 'About me',
    picture: 'pic.jpg',
  };
  const onSubmit = vi.fn((event) => event.preventDefault());
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders form fields and buttons', () => {
    render(<StyledProfileForm profile={profile} onSubmit={onSubmit} />);
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('About me')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
    expect(screen.getByText(/^update-testuser$/)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Show-1' })).toBeInTheDocument();
    expect(screen.getByTestId('picture-pic.jpg')).toBeInTheDocument();
    expect(screen.getByText(/^picture-scale-2$/)).toBeInTheDocument();
  });

  it('updates form data on input change', async () => {
    const { container } = render(
      <StyledProfileForm profile={profile} onSubmit={onSubmit} />,
    );
    const usernameInput = container.querySelector('#username');
    await user.clear(usernameInput);
    await user.type(usernameInput, 'newuser');
    expect(usernameInput).toHaveValue('newuser');
  });

  it('calls onSubmit when the update button is clicked', async () => {
    render(<StyledProfileForm profile={profile} onSubmit={onSubmit} />);

    const updateButton = screen.getByRole('button', { name: 'Update' });
    await user.click(updateButton);

    expect(onSubmit).toHaveBeenCalled();
  });
});
