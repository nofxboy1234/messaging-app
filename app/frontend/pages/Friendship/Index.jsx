import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/react';
import Friendship from './Friendship';
import FriendshipTotal from './Total';

function FriendshipIndex({ friendshipsAsSender, friendshipsAsReceiver }) {
  const { shared } = usePage().props;

  return (
    <div>
      {shared.flash.notice && (
        <p style={{ color: 'green' }}>{shared.flash.notice}</p>
      )}

      <FriendshipTotal
        friendships={friendshipsAsSender.concat(friendshipsAsReceiver)}
      />

      <div>
        {friendshipsAsSender.map((friendship) => (
          <Friendship
            key={friendship.id}
            friendship={friendship}
            user={friendship.friend}
          />
        ))}

        {friendshipsAsReceiver.map((friendship) => (
          <Friendship
            key={friendship.id}
            friendship={friendship}
            user={friendship.user}
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
  friendshipsAsSender: PropTypes.array,
  friendshipsAsReceiver: PropTypes.array,
};

export default FriendshipIndex;
