import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/react';
import Friendship from './Friendship';
import FriendshipTotal from './Total';
import { useEffect, useState } from 'react';
import consumer from '../../channels/consumer';
import styled from 'styled-components';

function FriendshipIndex({ className, initialChatsWithFriends }) {
  const [chatsWithFriends, setChatsWithFriends] = useState(
    initialChatsWithFriends,
  );
  const { shared } = usePage().props;
  const [activeFriendshipId, setActiveFriendshipId] = useState();

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      { channel: 'FriendshipChannel', id: shared.current_user.id },
      {
        connected() {},

        disconnected() {},

        received(updatedFriendships) {
          setChatsWithFriends(updatedFriendships);
        },
      },
    );

    return () => {
      channel.unsubscribe();
    };
  }, [shared.current_user.id]);

  return (
    <div id="friend-index" className={className}>
      <FriendshipTotal friendships={chatsWithFriends} />
      <div id="friendships">
        {chatsWithFriends.map((chat) => (
          <Friendship
            key={chat.friendship.id}
            friendship={chat.friendship}
            user={chat.friend}
            chat={chat}
            active={chat.friendship.id === activeFriendshipId}
            handleClick={() => {
              setActiveFriendshipId(chat.friendship.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

FriendshipIndex.propTypes = {
  className: PropTypes.string,
  initialChatsWithFriends: PropTypes.array,
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
