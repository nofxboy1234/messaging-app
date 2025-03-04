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

  it('should call the onClick function when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<SendMessageButton onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'Send' });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('should not call the onClick function when not clicked', async () => {
    const onClick = vi.fn();
    render(<SendMessageButton onClick={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
  });
});
