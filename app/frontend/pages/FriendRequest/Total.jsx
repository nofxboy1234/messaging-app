import PropTypes from 'prop-types';

function OutgoingFriendTotal({ outgoingFriends }) {
  return <div>OUTGOING FRIEND REQUESTS-{outgoingFriends.length}</div>;
}

OutgoingFriendTotal.propTypes = {
  outgoingFriends: PropTypes.array,
};

export default OutgoingFriendTotal;
