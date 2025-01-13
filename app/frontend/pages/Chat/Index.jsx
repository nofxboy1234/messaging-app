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
    };
  }, [shared.current_user.id]);

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

export default ChatIndex;
