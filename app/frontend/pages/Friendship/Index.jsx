import PropTypes from 'prop-types';
import { router, usePage } from '@inertiajs/react';
import Friendship from './Friendship';
import FriendshipTotal from './Total';
import { useEffect, useState } from 'react';
import consumer from '../../channels/consumer';
import styled from 'styled-components';

function FriendshipIndex({ className, initialFriendships }) {
  const [friendships, setFriendships] = useState(initialFriendships);
  const { shared } = usePage().props;
  const [activeFriendshipId, setActiveFriendshipId] = useState();

  useEffect(() => {
    const removeInvalidEventListener = router.on('invalid', (event) => {
      if (event.detail.response.data === '') {
        event.preventDefault();
      }
    });

    return () => {
      removeInvalidEventListener();
    };
  }, []);

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
    <div id="friend-index" className={className}>
      <FriendshipTotal friendships={friendships} />
      <div id="friendships">
        {friendships.map((friendship) => (
          <Friendship
            key={friendship.friendship.id}
            friendship={friendship.friendship}
            user={friendship.friend}
            chat={friendship.chat}
            active={friendship.friendship.id === activeFriendshipId}
            handleClick={() => {
              setActiveFriendshipId(friendship.friendship.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

FriendshipIndex.propTypes = {
  className: PropTypes.string,
  initialFriendships: PropTypes.array,
};

const StyledFriendshipIndex = styled(FriendshipIndex)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  & > div#friendships {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
  }
`;

export default StyledFriendshipIndex;
