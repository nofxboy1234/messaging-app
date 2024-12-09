import FriendRequest from './FriendRequest';
import Direction from './Direction';
import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/react';

function FriendRequestIndex({ outgoingFriends, incomingFriends }) {
  const { shared } = usePage().props;

  return (
    <div>
      {shared.flash.notice && (
        <p style={{ color: 'green' }}>{shared.flash.notice}</p>
      )}

      <h1>Outgoing Friend Requests</h1>
      <div>
        {outgoingFriends.map((pendingFriend) => (
          <FriendRequest
            key={pendingFriend.id}
            pendingFriend={pendingFriend}
            direction={Direction.OUTGOING}
          />
        ))}
      </div>

      <h1>Incoming Friend Requests</h1>
      <div>
        {incomingFriends.map((pendingFriend) => (
          <FriendRequest
            key={pendingFriend.id}
            pendingFriend={pendingFriend}
            direction={Direction.INCOMING}
          />
        ))}
      </div>
    </div>
  );
}

FriendRequestIndex.propTypes = {
  flash: PropTypes.object,
  outgoingFriends: PropTypes.array,
  incomingFriends: PropTypes.array,
};

export default FriendRequestIndex;
