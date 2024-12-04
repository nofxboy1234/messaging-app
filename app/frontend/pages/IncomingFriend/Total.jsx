import PropTypes from 'prop-types';

function IncomingFriendTotal({ incomingFriends }) {
  return <div>INCOMING FRIEND REQUESTS-{incomingFriends.length}</div>;
}

IncomingFriendTotal.propTypes = {
  incomingFriends: PropTypes.array,
};

export default IncomingFriendTotal;
