import UserTotal from './Total';
import PropTypes from 'prop-types';
import ProfileLink from '../Profile/Link';
import styled from 'styled-components';
import { usePage } from '@inertiajs/react';
import useSetupChatUsers from '../../hooks/useSetupChatUsers';

function ChatUserIndex({ className }) {
  const pageContext = usePage();
  const { chat } = pageContext.props;

  const users = useSetupChatUsers(chat);

  return (
    <div className={className} data-testid="chat-user-index">
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
