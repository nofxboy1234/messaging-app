import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageBox from '../../pages/Chat/MessageBox';
import sendMessage from '../../pages/Chat/Buttons/sendMessage';

vi.mock('../../pages/Chat/Buttons/sendMessage', () => ({
  default: vi.fn(),
}));

describe('MessageBox', () => {
  describe('when the send button is clicked', () => {
    it('should send a message to the given "chat" in props', async () => {
      const user = userEvent.setup();
      const chat = {};
      render(<MessageBox chat={chat} />);

      const input = screen.getByRole('textbox', { name: '' });
      const button = screen.getByRole('button', { name: 'Send' });
      await user.type(input, 'Hello');
      await user.click(button);

      expect(sendMessage).toHaveBeenCalledWith('Hello', chat);
    });

    it('should clear the input', async () => {
      const user = userEvent.setup();
      const chat = {};
      render(<MessageBox chat={chat} />);

      const input = screen.getByRole('textbox', { name: '' });
      const button = screen.getByRole('button', { name: 'Send' });
      await user.type(input, 'Hello');
      await user.click(button);

      expect(input).toHaveValue('');
    });

    it('should focus the input', async () => {
      const user = userEvent.setup();
      const chat = {};
      render(<MessageBox chat={chat} />);

      const input = screen.getByRole('textbox', { name: '' });
      const button = screen.getByRole('button', { name: 'Send' });
      await user.click(button);

      expect(input).toHaveFocus();
    });
  });

  describe('when the Enter key is pressed', () => {
    it('should send a message to the given "chat" in props', async () => {
      const user = userEvent.setup();
      const chat = {};
      render(<MessageBox chat={chat} />);

      const input = screen.getByRole('textbox', { name: '' });
      await user.type(input, 'Hey!{Enter}');

      expect(sendMessage).toHaveBeenCalledWith('Hey!', chat);
    });
  });

  describe('when the input is typed into', () => {
    it('should update the typed text', async () => {
      const user = userEvent.setup();
      const chat = {};
      render(<MessageBox chat={chat} />);

      const input = screen.getByRole('textbox', { name: '' });
      await user.type(input, 'Hello');

      expect(input).toHaveValue('Hello');
    });
  });
});
