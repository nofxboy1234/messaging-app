// app/frontend/tests/unit/MemberTotal.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
// import MemberTotal from '../../pages/MemberTotal'; // Assuming it's in pages/
import MemberTotal from '../../../pages/Chat/MemberTotal';

describe('MemberTotal', () => {
  it('renders the member count correctly', () => {
    const chat = { members: [{ id: 1 }, { id: 2 }] };
    render(<MemberTotal chat={chat} />);
    expect(screen.getByText('MEMBERS-2')).toBeInTheDocument();
  });

  it('renders zero when members array is empty', () => {
    const chat = { members: [] };
    render(<MemberTotal chat={chat} />);
    expect(screen.getByText('MEMBERS-0')).toBeInTheDocument();
  });
});
