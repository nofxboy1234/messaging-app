// app/frontend/tests/unit/ChatButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledChatButton from '../../../pages/Friendship/Buttons/ChatButton';

vi.mock('../../../pages/Buttons/Button', () => ({
  default: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

vi.mock('../../../pathHelpers/chats', () => {
  const httpShow = vi.fn(() => {});
  return {
    default: {
      show: ({ obj }) => httpShow(obj),
      httpShow,
    },
  };
});

describe('StyledChatButton', () => {
  const chat = { id: 1 };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders with Chat text', () => {
    render(<StyledChatButton chat={chat} />);

    expect(screen.getByRole('button', { name: 'Chat' })).toBeInTheDocument();
  });

  it('calls API on click', async () => {
    const mockApi = (await import('../../../pathHelpers/chats')).default;
    render(<StyledChatButton chat={chat} />);

    await user.click(screen.getByRole('button', { name: 'Chat' }));

    expect(mockApi.httpShow).toHaveBeenCalledWith(chat);
    expect(mockApi.httpShow).toHaveBeenCalledTimes(1);
  });
});
