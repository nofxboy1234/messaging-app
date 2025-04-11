// app/frontend/tests/unit/UpdateProfileButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledUpdateProfileButton from '../../pages/Profile/Buttons/UpdateProfileButton';

vi.mock('../../pages/Buttons/Button', () => ({
  default: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

describe('StyledUpdateProfileButton', () => {
  const onSubmit = vi.fn();
  const form = { data: {} };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders with Update text', () => {
    render(<StyledUpdateProfileButton onSubmit={onSubmit} form={form} />);
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });

  it('calls onSubmit with form on click', async () => {
    render(<StyledUpdateProfileButton onSubmit={onSubmit} form={form} />);
    await user.click(screen.getByRole('button', { name: 'Update' }));
    expect(onSubmit).toHaveBeenCalledWith(form);
  });
});
