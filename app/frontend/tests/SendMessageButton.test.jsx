import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SendMessageButton from '../pages/Chat/Buttons/SendMessageButton';

describe('SendMessageButton', () => {
  it('should render a button with the text "Send"', () => {
    render(<SendMessageButton />);

    const button = screen.getByRole('button', { name: 'Send' });

    expect(button).toBeInTheDocument();
  });

  // it('should call the setMessage function when clicked', async () => {
  //   const setMessage = vi.fn();
  //   const user = userEvent.setup();
  //   render(<SendMessageButton setMessage={setMessage} />);
  //   const button = screen.getByRole('button', { name: 'Click me' });
  //   await user.click(button);
  //   expect(setMessage).toHaveBeenCalled();
  // });

  // it('should set focus to the message box', async () => {
  //   const setMessage = vi.fn();
  //   const user = userEvent.setup();
  //   render(<SendMessageButton setMessage={setMessage} />);
  //   const button = screen.getByRole('button', { name: 'Click me' });
  //   await user.click(button);
  //   expect(setMessage).toHaveBeenCalled();
  // });
});
