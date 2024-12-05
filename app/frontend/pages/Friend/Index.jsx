import Friend from './Friend';
import FriendTotal from './Total';
import PropTypes from 'prop-types';

function FriendIndex({ friends }) {
  console.log('render Friend/Index');

  return (
    <div>
      <FriendTotal friends={friends} />
      <div>
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
}

FriendIndex.propTypes = {
  friends: PropTypes.array,
};

export default FriendIndex;
