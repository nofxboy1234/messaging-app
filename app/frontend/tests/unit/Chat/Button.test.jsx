import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../../pages/Buttons/Button';

describe('Button', () => {
  it('should render a button with the "text" prop as its text', () => {
    render(<Button text={'Do something'} />);

    const button = screen.getByRole('button', { name: 'Do something' });

    expect(button).toBeInTheDocument();
  });

  it('should call the onClick function when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick} text={'Click me'} />);

    const button = screen.getByRole('button', { name: 'Click me' });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('should not call the onClick function when it is not clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} text={'Click me'} />);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should set the button type to "submit" if the "type" prop is specified', () => {
    render(<Button text={'Click me'} type="submit" />);

    const button = screen.getByRole('button', { name: 'Click me' });

    expect(button).toHaveAttribute('type', 'submit');
  });
});
