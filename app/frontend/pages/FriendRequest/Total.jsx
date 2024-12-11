import PropTypes from 'prop-types';

function FriendRequestTotal({ outgoingFriends }) {
  return <div>OUTGOING FRIEND REQUESTS-{outgoingFriends.length}</div>;
}

FriendRequestTotal.propTypes = {
  outgoingFriends: PropTypes.array,
};

export default FriendRequestTotal;
