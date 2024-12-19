import styled from 'styled-components';
import ChatLink from './Link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';
import { usePage } from '@inertiajs/react';

function ChatIndex({ className, initialChats }) {
  const [chats, setChats] = useState(initialChats);

  const { shared } = usePage().props;

  // console.log('chats');
  // console.log(chats);

  useEffect(() => {
    const consumer = createConsumer();
    const channel = consumer.subscriptions.create(
      { channel: 'ChatChannel', id: shared.current_user.id },
      {
        connected() {
          console.log('*** frontend ChatChannel connected ***');
        },

        disconnected() {
          console.log('*** frontend ChatChannel disconnected ***');
        },

        received(data) {
          console.log('*** frontend ChatChannel received ***');
          console.log(data);
          setChats(data);
        },
      },
    );

    return () => {
      channel.unsubscribe();
      consumer.disconnect();
    };
  }, [shared.current_user]);

  return (
    <div className={className}>
      <div>
        {chats.map((chat) => (
          <ChatLink
            key={chat.friend.id}
            chat={chat.chat}
            friend={chat.friend}
          />
        ))}
      </div>
    </div>
  );
}

ChatIndex.propTypes = {
  className: PropTypes.string,
  initialChats: PropTypes.array,
};

const StyledChatIndex = styled(ChatIndex)`
  padding: 1rem;
`;

export default StyledChatIndex;
