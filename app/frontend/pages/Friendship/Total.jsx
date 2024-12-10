import PropTypes from 'prop-types';

function FriendshipTotal({ friendships }) {
  return <div>ALL FRIENDS-{friendships.length}</div>;
}

FriendshipTotal.propTypes = {
  friendships: PropTypes.array,
};

export default FriendshipTotal;
