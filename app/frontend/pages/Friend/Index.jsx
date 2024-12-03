import Friend from './Friend';
import FriendTotal from './Total';

function FriendIndex({ friends }) {
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

export default FriendIndex;
