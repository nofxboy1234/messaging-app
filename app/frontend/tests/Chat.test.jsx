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
        <>
          <div>{message.id}</div>
          <div data-testid="message">{message.body}</div>
        </>
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
    expect(messages[0].textContent).toBe('hello user2');
    expect(messages[1].textContent).toBe('hi user1, how are you?');
    expect(messages[2].textContent).toBe('I am fine thanks, and you?');
  });
});
