import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/react';
import Friendship from './Friendship';
import FriendshipTotal from './Total';
import { useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';

function FriendshipIndex({ initialFriendships }) {
  const [friendships, setFriendships] = useState(initialFriendships);

  const { shared } = usePage().props;

  useEffect(() => {
    const consumer = createConsumer();
    const channel = consumer.subscriptions.create(
      { channel: 'FriendshipChannel', id: shared.current_user.id },
      {
        connected() {
          console.log('*** frontend FriendshipChannel connected ***');
        },

        disconnected() {
          console.log('*** frontend FriendshipChannel disconnected ***');
        },

        received(updatedFriendships) {
          console.log('*** frontend FriendshipChannel received ***');
          console.log(`updatedFriendships: ${updatedFriendships}`);
          setFriendships(updatedFriendships);
        },
      },
    );

    return () => {
      channel.unsubscribe();
      consumer.disconnect();
    };
  }, [shared.current_user]);

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
  flash: PropTypes.object,
  initialFriendships: PropTypes.array,
};

export default FriendshipIndex;
