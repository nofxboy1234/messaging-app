import styled from 'styled-components';
import ChatLink from './Link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import consumer from '../../channels/consumer';
import { usePage } from '@inertiajs/react';

function ChatIndex({ className, initialChats }) {
  const [chats, setChats] = useState(initialChats);

  const { shared } = usePage().props;

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      { channel: 'ChatChannel', id: shared.current_user.id },
      {
        connected() {},

        disconnected() {},

        received(data) {
          setChats(data);
        },
      },
    );

    return () => {
      channel.unsubscribe();
      consumer.disconnect();
    };
  }, [shared.current_user.id]);

  console.log([shared.current_user.id]);

  return (
    <div className={className}>
      {chats.map((chat) => (
        <ChatLink key={chat.friend.id} chat={chat.chat} friend={chat.friend} />
      ))}
    </div>
  );
}

ChatIndex.propTypes = {
  className: PropTypes.string,
  initialChats: PropTypes.array,
};

const StyledChatIndex = styled(ChatIndex)`
  display: flex;
  flex-direction: column;
  height: 1170px;
  padding: 0.1rem;
  background-color: #4df0d5;
`;

export default StyledChatIndex;
