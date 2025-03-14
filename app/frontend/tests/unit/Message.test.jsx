import { vi, describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { forwardRef } from 'react';
import Chat from '../../pages/Chat/Chat';
import Message from '../../pages/Message/Message';
import consumer from '../../channels/consumer';

vi.mock('../../pages/Profile/Picture', () => {
  return {
    default: function Picture({ src, scale }) {
      return <div>{src} </div>;
    },
  };
});

describe('Message', () => {
  it('should render a message body', () => {
    const message = {
      id: 1,
      body: 'hello',
      user: { profile: { picture: 'picture url', username: 'user1' } },
    };
    render(<Message message={message} />);

    const helloMessage = screen.getByText('hello');
    expect(helloMessage.textContent).toBe('hello');
  });

  // it('should not render any messages when chat has no messages', () => {
  //   const chat = {
  //     messages: [],
  //   };
  //   render(<Chat chat={chat} />);

  //   const messages = screen.queryAllByTestId('message');
  //   expect(messages.length).toBe(0);
  // });

  // it('should append new messages received from web socket', async () => {
  //   const chat = {
  //     messages: [
  //       { id: 1, body: 'hello user2' },
  //       { id: 2, body: 'hi user1, how are you?' },
  //       { id: 3, body: 'I am fine thanks, and you?' },
  //     ],
  //   };
  //   render(<Chat chat={chat} />);

  //   const subscription = consumer.subscriptions.subscriptions[0];
  //   act(() => {
  //     subscription.received({ id: 4, body: 'New message' });
  //   });

  //   const messages = await screen.findAllByTestId('message');
  //   expect(messages.length).toBe(4);
  //   expect(messages[3].textContent).toBe('New message');
  // });

  // it('should unsubscribe from the subscription on unmount', async () => {
  //   const chat = {
  //     messages: [
  //       { id: 1, body: 'hello user2' },
  //       { id: 2, body: 'hi user1, how are you?' },
  //       { id: 3, body: 'I am fine thanks, and you?' },
  //     ],
  //   };
  //   const { unmount } = render(<Chat chat={chat} />);

  //   const subscription = consumer.subscriptions.subscriptions[0];
  //   unmount();

  //   expect(subscription.unsubscribe).toHaveBeenCalled();
  // });
});
