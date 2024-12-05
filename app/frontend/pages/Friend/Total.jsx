import PropTypes from 'prop-types';

function FriendTotal({ friends }) {
  return <div>ALL FRIENDS-{friends.length}</div>;
}

FriendTotal.propTypes = {
  friends: PropTypes.array,
};

export default FriendTotal;
