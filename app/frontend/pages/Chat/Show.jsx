import Chat from './Chat';
import MessageBox from './MessageBox';
import { useEffect, useContext } from 'react';
import { LayoutContext } from '../Layout';
import { usePage } from '@inertiajs/react';
import PropTypes from 'prop-types';

function ChatShow({ chat }) {
  const { shared } = usePage().props;
  const { setUsers } = useContext(LayoutContext);

  useEffect(() => {
    setUsers(chat.members);

    return () => {
      setUsers(shared.users);
    };
  }, [chat.members, setUsers, shared.users]);

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
