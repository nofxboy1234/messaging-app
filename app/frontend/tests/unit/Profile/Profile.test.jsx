// app/frontend/tests/unit/Profile.test.jsx
import { act, render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import consumer from '../../../channels/consumer';
import StyledProfile from '../../../pages/Profile/Profile';

vi.mock('../../../pages/Profile/Picture', () => ({
  default: ({ src }) => (
    <img src={src} alt="pic" data-testid={`picture-${src}`} />
  ),
}));

vi.mock('../../../channels/consumer', () => {
  let subscriptions = [];

  const createSubscription = (params, callbacks) => ({
    identifier: params.id,
    unsubscribe: vi.fn(() => {
      subscriptions = subscriptions.filter(
        (subscription) => subscription.identifier !== params.id,
      );
    }),
    received: callbacks.received,
  });

  return {
    default: {
      subscriptions: {
        create: vi.fn((channelParams, callbacks) => {
          const subscription = createSubscription(channelParams, callbacks);
          subscriptions.push(subscription);
          return subscription;
        }),
        getSubscriptions: () => subscriptions,
      },
    },
  };
});

describe('StyledProfile', () => {
  const initialProfile = {
    id: 1,
    username: 'testuser',
    picture: 'pic.jpg',
    about: 'About me',
  };

  it('renders profile data', () => {
    render(<StyledProfile initialProfile={initialProfile} />);

    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('About me')).toBeInTheDocument();
    expect(screen.getByTestId('picture-pic.jpg')).toBeInTheDocument();
  });

  it('subscribes to the profile channel on mount', () => {
    render(<StyledProfile initialProfile={initialProfile} />);

    expect(consumer.subscriptions.create).toHaveBeenCalledTimes(1);
  });

  it('unsubscribes from the profile channel on unmount', () => {
    const { unmount } = render(
      <StyledProfile initialProfile={initialProfile} />,
    );
    const sub = consumer.subscriptions.getSubscriptions()[0];

    unmount();

    expect(sub.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('updates profile received on the websocket channel', () => {
    render(<StyledProfile initialProfile={initialProfile} />);
    const sub = consumer.subscriptions.getSubscriptions()[0];

    act(() => {
      sub.received({
        id: 2,
        username: 'newuser',
        picture: 'new.jpg',
        about: 'New about',
      });
    });

    expect(screen.getByText('newuser')).toBeInTheDocument();
    expect(screen.getByText('New about')).toBeInTheDocument();
    expect(screen.getByTestId('picture-new.jpg')).toBeInTheDocument();
  });
});
