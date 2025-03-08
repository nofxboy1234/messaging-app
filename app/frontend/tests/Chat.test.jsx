import { vi, describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { forwardRef } from 'react';
import Chat from '../pages/Chat/Chat';
import consumer from '../channels/consumer';
import { scrollIntoViewMock } from '../pages/Message/Message';

vi.mock('../pages/Message/Message', () => {
  const scrollIntoViewMock = vi.fn(function () {
    console.log(this.lastChild.textContent);
  });
  return {
    default: forwardRef(function Message({ message }, ref) {
      return (
        <div
          ref={(node) => {
            if (node) {
              if (ref) {
                node.scrollIntoView = scrollIntoViewMock;
                ref.current = node;
              }
            }
          }}
          data-testid={`message-${message.id}`}
        >
          <div>{message.id}</div>
          <div data-testid="message">{message.body}</div>
        </div>
      );
    }),
    scrollIntoViewMock,
  };
});

vi.mock('../channels/consumer', async () => {
  const subscription = {
    unsubscribe: vi.fn(),
    received: null,
  };

  return {
    default: {
      subscriptions: {
        create: vi.fn((_, callbacks) => {
          subscription.received = callbacks.received;
          return subscription;
        }),
        subscriptions: [subscription],
      },
    },
  };
});

describe('Chat', () => {
  it.skip('should render all messages in a chat', () => {
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

  it.skip('should not render any messages when chat has no messages', () => {
    const chat = {
      messages: [],
    };
    render(<Chat chat={chat} />);

    const messages = screen.queryAllByTestId('message');
    expect(messages.length).toBe(0);
  });

  it.skip('should append new messages received from web socket', async () => {
    const chat = {
      messages: [
        { id: 1, body: 'hello user2' },
        { id: 2, body: 'hi user1, how are you?' },
        { id: 3, body: 'I am fine thanks, and you?' },
      ],
    };
    render(<Chat chat={chat} />);

    const subscription = consumer.subscriptions.subscriptions[0];
    act(() => {
      subscription.received({ id: 4, body: 'New message' });
    });

    const messages = await screen.findAllByTestId('message');
    expect(messages.length).toBe(4);
    expect(messages[3].textContent).toBe('New message');
  });

  it.skip('should unsubscribe from the subscription on unmount', async () => {
    const chat = {
      messages: [
        { id: 1, body: 'hello user2' },
        { id: 2, body: 'hi user1, how are you?' },
        { id: 3, body: 'I am fine thanks, and you?' },
      ],
    };
    const { unmount } = render(<Chat chat={chat} />);

    const subscription = consumer.subscriptions.subscriptions[0];
    unmount();

    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  // describe('when the scrollbar is at the top and a message is received', () => {
  //   it('should not scroll to the newest message', async () => {
  //     const chat = {
  //       messages: [
  //         { id: 1, body: 'hello user2' },
  //         { id: 2, body: 'hi user1, how are you?' },
  //         { id: 3, body: 'I am fine thanks, and you?' },
  //       ],
  //     };
  //     render(<Chat chat={chat} />);

  //     const rootElement = screen.getByTestId('root');
  //     rootElement.scrollTop = 0;
  //     const subscription = consumer.subscriptions.subscriptions[0];
  //     act(() => {
  //       subscription.received({ id: 4, body: 'New message' });
  //     });

  //     expect(rootElement.scrollTop).toBe(0);
  //   });
  // });

  describe('when the scrollbar is at the bottom and a message is received', () => {
    it('should scroll to the newest message', async () => {
      const chat = {
        messages: [
          { id: 1, body: 'hello user2' },
          { id: 2, body: 'hi user1, how are you?' },
          { id: 3, body: 'I am fine thanks, and you?' },
        ],
      };
      render(<Chat chat={chat} />);
      const rootElement = screen.getByTestId('root');

      Object.defineProperty(rootElement, 'scrollHeight', {
        value: 1000,
        writable: false,
      });
      Object.defineProperty(rootElement, 'scrollTop', {
        value: 900,
        writable: true,
      });
      Object.defineProperty(rootElement, 'clientHeight', {
        value: 100,
        writable: false,
      });

      expect(
        rootElement.scrollHeight -
          rootElement.scrollTop -
          rootElement.clientHeight,
      ).toBeLessThanOrEqual(3);

      const subscription = consumer.subscriptions.subscriptions[0];
      act(() => {
        subscription.received({ id: 4, body: 'New message' });
      });

      await screen.findAllByTestId('message');
      expect(scrollIntoViewMock).toHaveBeenCalled();
      expect(screen.getByTestId('message-4')).toBeInTheDocument();
    });
  });
});
