import Friend from './Friend';
import FriendTotal from './Total';
import PropTypes from 'prop-types';
import Layout from '../Layout';

function FriendIndex({ friends }) {
  console.log('render Friend/Index');

  return (
    <Layout>
      <div>
        <FriendTotal friends={friends} />
        <div>
          {friends.map((friend) => (
            <Friend key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

FriendIndex.propTypes = {
  friends: PropTypes.array,
};

export default FriendIndex;
