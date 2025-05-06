// app/frontend/tests/unit/BackButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledBackButton from '../../../pages/registrations/Buttons/BackButton';

vi.mock('../../../pages/Buttons/Button', () => ({
  default: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

vi.mock('../../../pathHelpers', () => ({
  default: {
    sessions: {
      new: vi.fn(),
    },
  },
}));

describe('StyledBackButton', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders with Back text', () => {
    render(<StyledBackButton />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('calls API on click', async () => {
    const mockApi = (await import('../../../pathHelpers')).default;
    render(<StyledBackButton />);

    await user.click(screen.getByRole('button', { name: 'Back' }));

    expect(mockApi.sessions.new).toHaveBeenCalledTimes(1);
  });
});
