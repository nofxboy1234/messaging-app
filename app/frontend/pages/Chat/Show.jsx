import Chat from './Chat';
import MessageBox from './MessageBox';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import PropTypes from 'prop-types';
import api from '../../pathHelpers';

function ChatShow({ chat }) {
  const { shared } = usePage().props;

  useEffect(() => {
    api.usersBroadcast.create({
      data: { user_id: shared.current_user.id, chat_id: chat.id },
    });

    return () => {
      api.usersBroadcast.create({
        data: { user_id: shared.current_user.id, chat_id: undefined },
      });
    };
  }, [chat.id, shared.current_user.id]);

  return (
    <div>
      <Chat chat={chat} />
      <MessageBox chat={chat} />
    </div>
  );
}

ChatShow.propTypes = {
  chat: PropTypes.object,
};

export default ChatShow;
