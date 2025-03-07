import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { forwardRef } from 'react';
import Chat from '../pages/Chat/Chat';

vi.mock('../pages/Message/Message', () => {
  return {
    default: forwardRef(function Message(props, ref) {
      const { message } = props;

      return (
        <div data-testid="message">
          <div>{message.id}</div>
          <div>{message.body}</div>
        </div>
      );
    }),
  };
});

describe('Chat', () => {
  it('should display all messages in a chat', () => {
    const chat = {
      messages: [
        { id: 1, body: 'hello user2' },
        { id: 2, body: 'hi user1, how are you?' },
        { id: 3, body: 'I am fine thanks, and you?' },
      ],
    };
    render(<Chat chat={chat} />);

    const messages = screen.queryAllByTestId('message');
    expect(messages.length).toBe(3);
  });
});
