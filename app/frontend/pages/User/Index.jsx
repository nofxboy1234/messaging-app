import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePage } from '@inertiajs/react';
import ChatUserIndex from './ChatUserIndex';
import AllUserIndex from './AllUserIndex';

function UserIndex({ className }) {
  const pageContext = usePage();
  const { chat: activeChat } = pageContext.props;
  const { component } = pageContext;

  return (
    <div className={className}>
      {component === 'Chat/Show' && activeChat ? (
        <ChatUserIndex key={activeChat.id} />
      ) : (
        <AllUserIndex />
      )}
    </div>
  );
}

UserIndex.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
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
