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

  it('should display the typed text when typed into', async () => {
    const user = userEvent.setup();
    render(<MessageInput />);

    const input = screen.getByRole('textbox', { name: '' });
    await user.type(input, 'Hello');

    expect(input).toHaveValue('Hello');
  });

  it('should call the onChange function when typed into', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MessageInput onChange={onChange} />);

    const input = screen.getByRole('textbox', { name: '' });
    await user.type(input, 'Hello');

    expect(onChange).toHaveBeenCalled();
  });

  it('should not call the onChange function when not typed into', () => {
    const onChange = vi.fn();
    render(<MessageInput onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should display the message prop text', async () => {
    render(<MessageInput message={'Bye'} />);

    const input = screen.getByRole('textbox', { name: '' });

    expect(input).toHaveValue('Bye');
  });
});
