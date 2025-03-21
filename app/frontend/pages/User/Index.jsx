import UserTotal from './Total';
import PropTypes from 'prop-types';
import ProfileLink from '../Profile/Link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import subscribe from '../../channels/subscriptions';

function UserIndex({ className, allUsers, activeChat }) {
  const [users, setUsers] = useState(() =>
    activeChat ? activeChat.members : allUsers,
  );

  const isActiveChat = !!activeChat;

  const addUser = (user) => {
    setUsers((users) => [...users, user]);
  };

  useEffect(() => {
    let userChannel;

    if (isActiveChat) {
      console.log('*** User/Index subscribe to ChatUserChannel ***');

      setUsers(activeChat.members);
      userChannel = subscribe(
        'ChatUserChannel',
        { id: activeChat.id },
        addUser,
      );
    } else {
      console.log('*** User/Index subscribe to AllUserChannel ***');

      setUsers(allUsers);
      userChannel = subscribe('AllUserChannel', {}, addUser);
    }

    return () => {
      console.log('*** users subscription effect cleanup ***');

      userChannel.unsubscribe();
    };
  }, [activeChat?.id, isActiveChat]);

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

UserIndex.propTypes = {
  className: PropTypes.string,
  allUsers: PropTypes.array,
  activeChat: PropTypes.object,
};

const StyledUserIndex = styled(UserIndex)`
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

export default StyledUserIndex;
