import OutgoingFriendRequest from './OutgoingFriendRequest';
import IncomingFriendRequest from './IncomingFriendRequest';
import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import consumer from '../../channels/consumer';

function FriendRequestIndex({
  initialOutgoingFriendRequests,
  initialIncomingFriendRequests,
}) {
  const [outgoingFriendRequests, setOutgoingFriendRequests] = useState(
    initialOutgoingFriendRequests,
  );
  const [incomingFriendRequests, setIncomingFriendRequests] = useState(
    initialIncomingFriendRequests,
  );

  const { shared } = usePage().props;

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      { channel: 'FriendRequestChannel', id: shared.current_user.id },
      {
        connected() {},

        disconnected() {},

        received(data) {
          setOutgoingFriendRequests(data.initialOutgoingFriendRequests);
          setIncomingFriendRequests(data.initialIncomingFriendRequests);
        },
      },
    );

    return () => {
      channel.unsubscribe();
    };
  }, [shared.current_user.id]);

  return (
    <div>
      {shared.flash.notice && (
        <p style={{ color: 'green' }}>{shared.flash.notice}</p>
      )}

      <h1>Outgoing Friend Requests</h1>
      <div>
        {outgoingFriendRequests.map((friendRequest) => (
          <OutgoingFriendRequest
            key={friendRequest.id}
            friendRequest={friendRequest}
          />
        ))}
      </div>

      <h1>Incoming Friend Requests</h1>
      <div>
        {incomingFriendRequests.map((friendRequest) => (
          <IncomingFriendRequest
            key={friendRequest.id}
            friendRequest={friendRequest}
          />
        ))}
      </div>
    </div>
  );
}

FriendRequestIndex.propTypes = {
  initialOutgoingFriendRequests: PropTypes.array,
  initialIncomingFriendRequests: PropTypes.array,
};

export default FriendRequestIndex;
