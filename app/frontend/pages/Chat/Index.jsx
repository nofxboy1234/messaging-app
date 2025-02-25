import ChatLink from './Link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import consumer from '../../channels/consumer';
import { usePage } from '@inertiajs/react';
import styled from 'styled-components';
import ChatTotal from './Total';

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
    };
  }, [shared.current_user.id]);

  return (
    <div className={className}>
      <ChatTotal chats={chats} />
      <div id="chats">
        {chats.map((chat) => (
          <ChatLink key={chat.friend.id} chat={chat} friend={chat.friend} />
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
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  border: solid var(--border-color);
  border-width: 0 1px 1px;

  & > div#chats {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
  }
`;

export default StyledChatIndex;
