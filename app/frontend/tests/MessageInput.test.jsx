import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageInput from '../pages/Chat/MessageInput';

describe('MessageInput', () => {
  it('should render a blank input', () => {
    render(<MessageInput />);
    const input = screen.getByRole('textbox', { name: '' });
    expect(input).toBeInTheDocument();
  });

  // it('should call the onClick function when clicked', async () => {
  //   const onClick = vi.fn();
  //   const user = userEvent.setup();
  //   render(<MessageBox onClick={onClick} />);
  //   const button = screen.getByRole('button', { name: 'Send' });
  //   await user.click(button);
  //   expect(onClick).toHaveBeenCalled();
  // });

  // it('should not call the onClick function when not clicked', async () => {
  //   const onClick = vi.fn();
  //   render(<MessageBox onClick={onClick} />);
  //   expect(onClick).not.toHaveBeenCalled();
  // });
});
