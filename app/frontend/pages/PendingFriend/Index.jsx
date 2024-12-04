import PropTypes from 'prop-types';
import IncomingFriend from '../IncomingFriend/IncomingFriend';
import IncomingFriendTotal from '../IncomingFriend/Total';
import OutgoingFriend from '../OutgoingFriend/OutgoingFriend';
import OutgoingFriendTotal from '../OutgoingFriend/Total';

function PendingFriendIndex({ pendingFriends }) {
  return (
    <div>
      <IncomingFriendTotal incomingFriends={pendingFriends.incoming} />
      <div>
        {pendingFriends.incoming.map((incomingFriend) => (
          <IncomingFriend
            key={incomingFriend.id}
            incomingFriend={incomingFriend}
          />
        ))}
      </div>

      <OutgoingFriendTotal outgoingFriends={pendingFriends.outgoing} />
      <div>
        {pendingFriends.outgoing.map((outgoingFriend) => (
          <OutgoingFriend
            key={outgoingFriend.id}
            outgoingFriend={outgoingFriend}
          />
        ))}
      </div>
    </div>
  );
}

PendingFriendIndex.propTypes = {
  pendingFriends: PropTypes.array,
};

export default PendingFriendIndex;
