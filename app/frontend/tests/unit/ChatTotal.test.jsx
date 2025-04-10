// app/frontend/tests/unit/ChatTotal.test.jsx
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import StyledChatTotal from '../../pages/Chat/Total';

describe('StyledChatTotal', () => {
  it('renders the chat count correctly', () => {
    const chats = [{ id: 1 }, { id: 2 }, { id: 3 }];
    render(<StyledChatTotal chats={chats} />);
    expect(screen.getByText('CHATS-3')).toBeInTheDocument();
  });

  it('renders zero when chats array is empty', () => {
    const chats = [];
    render(<StyledChatTotal chats={chats} />);
    expect(screen.getByText('CHATS-0')).toBeInTheDocument();
  });
});
