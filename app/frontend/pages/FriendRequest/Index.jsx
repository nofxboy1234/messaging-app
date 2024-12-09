import OutgoingFriendRequest from './OutgoingFriendRequest';
import IncomingFriendRequest from './IncomingFriendRequest';
import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/react';

function FriendRequestIndex({
  outgoingFriendRequests,
  incomingFriendRequests,
}) {
  const { shared } = usePage().props;

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
  flash: PropTypes.object,
  outgoingFriendRequests: PropTypes.array,
  incomingFriendRequests: PropTypes.array,
};

export default FriendRequestIndex;
