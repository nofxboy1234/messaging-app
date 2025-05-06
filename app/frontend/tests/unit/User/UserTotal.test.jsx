// app/frontend/tests/unit/UserTotal.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StyledUserTotal from '../../../pages/User/Total';

describe('StyledUserTotal', () => {
  it('renders the user count correctly', () => {
    const users = [{}, {}, {}];
    render(<StyledUserTotal users={users} />);

    expect(screen.getByText('USERS-3')).toBeInTheDocument();
  });

  it('renders zero when users array is empty', () => {
    const users = [];
    render(<StyledUserTotal users={users} />);

    expect(screen.getByText('USERS-0')).toBeInTheDocument();
  });
});
