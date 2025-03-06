import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageBox from '../pages/Chat/MessageBox';
import sendMessage from '../pages/Chat/Buttons/sendMessage';

vi.mock('../pages/Chat/Buttons/sendMessage', () => ({
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
    it.skip('should clear the input', () => {});
    it.skip('should focus the input', () => {});
  });

  it.skip('should update the typed text when the input is typed into', async () => {
    const user = userEvent.setup();
    render(<MessageBox />);

    const input = screen.getByRole('textbox', { name: '' });
    await user.type(input, 'Hello');

    expect(input).toHaveValue('Hello');
  });

  // ************************************

  it.skip('should render a blank input', () => {
    render(<MessageBox />);
    const input = screen.getByRole('textbox', { name: '' });
    expect(input).toBeInTheDocument();
  });

  it.skip('should display the typed text when typed into', async () => {
    const user = userEvent.setup();
    render(<MessageBox />);

    const input = screen.getByRole('textbox', { name: '' });
    await user.type(input, 'Hello');

    expect(input).toHaveValue('Hello');
  });

  it.skip('should call the onChange function when typed into', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MessageBox onChange={onChange} />);

    const input = screen.getByRole('textbox', { name: '' });
    await user.type(input, 'Hello');

    expect(onChange).toHaveBeenCalled();
  });

  it.skip('should not call the onChange function when not typed into', () => {
    const onChange = vi.fn();
    render(<MessageBox onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();
  });

  it.skip('should display the message prop text', async () => {
    render(<MessageBox message={'Bye'} />);

    const input = screen.getByRole('textbox', { name: '' });

    expect(input).toHaveValue('Bye');
  });
});
