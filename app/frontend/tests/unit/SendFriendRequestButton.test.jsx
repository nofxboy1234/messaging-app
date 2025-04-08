// acceptFriendRequestButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledAcceptFriendRequestButton from './AcceptFriendRequestButton';

// Mock dependencies
vi.mock('../../Buttons/Button', () => ({
  default: ({ text, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  ),
}));

vi.mock('../../../pathHelpers', () => ({
  default: {
    friendRequests: {
      destroy: vi.fn(),
    },
    friendships: {
      create: vi.fn(),
    },
  },
}));

describe('StyledAcceptFriendRequestButton', () => {
  const friendRequest = {
    user: { profile: { username: 'testuser' } },
  };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    window.confirm = vi.fn(() => true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with Accept text', () => {
    render(<StyledAcceptFriendRequestButton friendRequest={friendRequest} />);
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it('shows confirmation dialog and calls APIs on click when confirmed', async () => {
    const mockApi = (await import('../../../pathHelpers')).default;
    render(<StyledAcceptFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByText('Accept'));

    expect(window.confirm).toHaveBeenCalledWith(
      'Accept friend request from testuser?',
    );
    expect(mockApi.friendRequests.destroy).toHaveBeenCalledWith({
      obj: friendRequest,
      options: expect.objectContaining({
        onBefore: expect.any(Function),
        onFinish: expect.any(Function),
      }),
    });
    expect(mockApi.friendships.create).toHaveBeenCalledWith({
      data: friendRequest,
    });
  });

  it('does not call APIs when confirmation is cancelled', async () => {
    window.confirm = vi.fn(() => false);
    const mockApi = (await import('../../../pathHelpers')).default;
    render(<StyledAcceptFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByText('Accept'));

    expect(mockApi.friendRequests.destroy).not.toHaveBeenCalled();
    expect(mockApi.friendships.create).not.toHaveBeenCalled();
  });
});

// cancelFriendRequestButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledCancelFriendRequestButton from './CancelFriendRequestButton';

vi.mock('../../Buttons/Button', () => ({
  default: ({ text, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  ),
}));

vi.mock('../../../pathHelpers', () => ({
  default: {
    friendRequests: {
      destroy: vi.fn(),
    },
  },
}));

describe('StyledCancelFriendRequestButton', () => {
  const friendRequest = {
    friend: { profile: { username: 'testuser' } },
  };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    window.confirm = vi.fn(() => true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with Cancel text', () => {
    render(<StyledCancelFriendRequestButton friendRequest={friendRequest} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('shows confirmation and calls destroy API on click when confirmed', async () => {
    const mockApi = (await import('../../../pathHelpers')).default;
    render(<StyledCancelFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByText('Cancel'));

    expect(window.confirm).toHaveBeenCalledWith(
      'Cancel friend request to testuser?',
    );
    expect(mockApi.friendRequests.destroy).toHaveBeenCalledWith({
      obj: friendRequest,
      options: expect.objectContaining({
        onBefore: expect.any(Function),
      }),
    });
  });
});

// rejectFriendRequestButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledRejectFriendRequestButton from './RejectFriendRequestButton';

vi.mock('../../Buttons/Button', () => ({
  default: ({ text, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  ),
}));

vi.mock('../../../pathHelpers', () => ({
  default: {
    friendRequests: {
      destroy: vi.fn(),
    },
  },
}));

describe('StyledRejectFriendRequestButton', () => {
  const friendRequest = {
    user: { profile: { username: 'testuser' } },
  };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    window.confirm = vi.fn(() => true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with Reject text', () => {
    render(<StyledRejectFriendRequestButton friendRequest={friendRequest} />);
    expect(screen.getByText('Reject')).toBeInTheDocument();
  });

  it('shows confirmation and calls destroy API on click when confirmed', async () => {
    const mockApi = (await import('../../../pathHelpers')).default;
    render(<StyledRejectFriendRequestButton friendRequest={friendRequest} />);

    await user.click(screen.getByText('Reject'));

    expect(window.confirm).toHaveBeenCalledWith(
      'Reject friend request from testuser?',
    );
    expect(mockApi.friendRequests.destroy).toHaveBeenCalledWith({
      obj: friendRequest,
      options: expect.objectContaining({
        onBefore: expect.any(Function),
      }),
    });
  });
});

// sendFriendRequestButton.test.jsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import StyledSendFriendRequestButton from './SendFriendRequestButton';

vi.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: {
      shared: {
        current_user: { id: 1 },
      },
    },
  }),
}));

vi.mock('../../Buttons/Button', () => ({
  default: ({ text, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  ),
}));

vi.mock('../../../pathHelpers', () => ({
  default: {
    friendRequests: {
      create: vi.fn(),
    },
  },
}));

describe('StyledSendFriendRequestButton', () => {
  const userData = {
    id: 2,
    profile: { username: 'testuser' },
  };
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    window.confirm = vi.fn(() => true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with Send text', () => {
    render(<StyledSendFriendRequestButton user={userData} />);
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('shows confirmation and calls create API on click when confirmed', async () => {
    const mockApi = (await import('../../../pathHelpers')).default;
    render(<StyledSendFriendRequestButton user={userData} />);

    await user.click(screen.getByText('Send'));

    expect(window.confirm).toHaveBeenCalledWith(
      'Send friend request to testuser?',
    );
    expect(mockApi.friendRequests.create).toHaveBeenCalledWith({
      data: {
        user_id: 1,
        friend_id: 2,
      },
      options: expect.objectContaining({
        onBefore: expect.any(Function),
      }),
    });
  });
});
