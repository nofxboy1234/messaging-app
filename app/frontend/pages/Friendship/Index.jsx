import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/react';
import Friendship from './Friendship';
import FriendshipTotal from './Total';
import { useEffect, useState } from 'react';
import consumer from '../../channels/consumer';

function FriendshipIndex({ initialFriendships }) {
  const [friendships, setFriendships] = useState(initialFriendships);

  const { shared } = usePage().props;

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      { channel: 'FriendshipChannel', id: shared.current_user.id },
      {
        connected() {},

        disconnected() {},

        received(updatedFriendships) {
          setFriendships(updatedFriendships);
        },
      },
    );

    return () => {
      channel.unsubscribe();
    };
  }, [shared.current_user.id]);

  return (
    <div id="friend-index">
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
  flash: PropTypes.object,
  initialFriendships: PropTypes.array,
};

export default FriendshipIndex;
