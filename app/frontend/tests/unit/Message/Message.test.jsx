import { vi, describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { forwardRef } from 'react';
import Chat from '../../../pages/Chat/Chat';
import Message from '../../../pages/Message/Message';
import consumer from '../../../channels/consumer';

vi.mock('../../../pages/Profile/Picture', () => {
  return {
    default: function Picture({ src, scale }) {
      return <div>profile picture</div>;
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

    const messageBody = screen.getByText('hello');
    expect(messageBody).toBeInTheDocument();
  });

  it('should render the username of the person who sent the message', () => {
    const message = {
      id: 1,
      body: 'hello',
      user: { profile: { picture: 'picture url', username: 'user1' } },
    };
    render(<Message message={message} />);

    const username = screen.getByText('user1');
    expect(username).toBeInTheDocument();
  });

  it('should render the profile picture of the person who sent the message', () => {
    const message = {
      id: 1,
      body: 'hello',
      user: { profile: { picture: 'picture url', username: 'user1' } },
    };
    render(<Message message={message} />);

    const profilePicture = screen.getByText('profile picture');
    expect(profilePicture).toBeInTheDocument();
  });
});
