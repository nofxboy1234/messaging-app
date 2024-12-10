import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/react';
import Friendship from './Friendship';
import FriendshipTotal from './Total';

function FriendshipIndex({ friendships }) {
  const { shared } = usePage().props;

  return (
    <div>
      {shared.flash.notice && (
        <p style={{ color: 'green' }}>{shared.flash.notice}</p>
      )}

      <FriendshipTotal friendships={friendships} />

      <div>
        {friendships.map((friendship) => (
          <Friendship
            key={friendship.friendship.id}
            friendship={friendship.friendship}
            user={friendship.friend}
            chat={friendship.chat}
          />
        ))}
      </div>
    </div>
  );
}

FriendshipIndex.propTypes = {
  friendships: PropTypes.array,
};

FriendshipIndex.propTypes = {
  flash: PropTypes.object,
  friendships: PropTypes.array,
};

export default FriendshipIndex;
