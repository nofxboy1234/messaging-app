import UserTotal from './Total';
import PropTypes from 'prop-types';
import ProfileLink from '../Profile/Link';
import styled from 'styled-components';
import { usePage } from '@inertiajs/react';
import useSetupChatUsers from '../../hooks/useSetupChatUsers';
import usePreviousValues from '../../hooks/usePreviousValues';
import logChangedValues from '../../helpers/logChangedValues';

function ChatUserIndex({ className }) {
  // check reinitializeUsers state change is 1 render when clicking user3 then user4
  // instead of 2 renders: context, state

  const pageContext = usePage();
  const { chat: activeChat } = pageContext.props;

  const users = useSetupChatUsers(activeChat.members, activeChat.id);

  console.log('*** render values ***');
  console.log('page context:', pageContext);
  console.log('users:', users);
  console.log('*********************');
  console.log('\n');

  console.log('*** changed values ***');
  const prevValues = usePreviousValues({ 'page context': usePage(), users });
  logChangedValues(...prevValues);
  console.log('**********************');
  console.log('\n');

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
