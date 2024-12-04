import PropTypes from 'prop-types';

function FriendTotal({ friends }) {
  console.log('render Friend/Total');

  return <div>ALL FRIENDS-{friends.length}</div>;
}

FriendTotal.propTypes = {
  friends: PropTypes.array,
};

export default FriendTotal;
