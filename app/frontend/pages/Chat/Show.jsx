import styled from 'styled-components';
import Chat from './Chat';
import MessageBox from './MessageBox';
import PropTypes from 'prop-types';
import HeaderProfileLink from './HeaderProfileLink';
import { useContext, useEffect } from 'react';
import { UsersContext } from '../Layout';

import subscribe from '../../channels/subscriptions';
import { usePage } from '@inertiajs/react';

function ChatShow({ className, chat, chattingWith }) {
  const { setUsers, setUserChannel } = useContext(UsersContext);
  const { shared } = usePage().props;

  useEffect(() => {
    function chatUserChannel() {
      return subscribe(
        'ChatUserChannel',
        { id: shared.current_user.id },
        setUsers,
      );
    }

    function allUserChannel() {
      return subscribe('AllUserChannel', {}, setUsers);
    }

    setUsers(chat.members);
    setUserChannel((userChannel) => {
      userChannel.unsubscribe();
      return chatUserChannel();
    });

    return () => {
      setUsers(shared.users);
      setUserChannel((userChannel) => {
        userChannel.unsubscribe();
        return allUserChannel();
      });
    };
  }, [
    shared.users,
    chat.members,
    setUserChannel,
    setUsers,
    shared.current_user.id,
  ]);

  // console.log([
  //   chat.members,
  //   setUserChannel,
  //   setUsers,
  //   userChannel,
  //   shared.current_user.id,
  // ]);

  return (
    <div className={className}>
      <HeaderProfileLink user={chattingWith} />
      <Chat chat={chat} />
      <MessageBox chat={chat} />
    </div>
  );
}

ChatShow.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object,
  chattingWith: PropTypes.object,
};

const StyledChatShow = styled(ChatShow)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;
`;

export default StyledChatShow;
