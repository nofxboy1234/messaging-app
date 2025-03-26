import UserTotal from './Total';
import PropTypes from 'prop-types';
import ProfileLink from '../Profile/Link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import subscribe from '../../channels/subscriptions';
import usePreviousValues from '../../hooks/usePreviousValues';
import logChangedValues from '../../helpers/logChangedValues';
import { usePage } from '@inertiajs/react';

function ChatUserIndex({ className }) {
  const { chat: activeChat } = usePage().props;
  const [users, setUsers] = useState(() => {
    const initialUsers = activeChat.members;
    return initialUsers;
  });

  const addUser = (user) => {
    setUsers((users) => [...users, user]);
  };

  useEffect(() => {
    console.log('~*~*~*');
    setUsers(activeChat.members);

    let userChannel;

    const userChannelSubscriptionInfo = [
      'ChatUserChannel',
      { id: activeChat.id },
      addUser,
    ];

    userChannel = subscribe(...userChannelSubscriptionInfo);
    console.log('subscribed: ', userChannel.identifier);

    return () => {
      console.log('------');

      userChannel.unsubscribe();
      console.log('unsubscribed: ', userChannel.identifier);
    };
  }, [activeChat.id, activeChat.members]);

  const prevValues = usePreviousValues({
    'activeChat.id': activeChat.id,
    'activeChat.members': activeChat.members,
  });
  logChangedValues(...prevValues);

  console.log('render User/ChatUserIndex');

  return (
    <div className={className}>
      <UserTotal users={users} />
      <div id="users">
        {users.map((user) => (
          <ProfileLink key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

ChatUserIndex.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
};

const StyledChatUserIndex = styled(ChatUserIndex)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  border: solid var(--border-color);
  border-width: 0 1px 1px;

  & > div#users {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
  }
`;

export default StyledChatUserIndex;
