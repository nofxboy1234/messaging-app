import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePage } from '@inertiajs/react';
import StyledChatUserIndex from './ChatUserIndex';

function UserIndex({ className }) {
  const { chat: activeChat } = usePage().props;

  console.log('render User/Index');

  return (
    <div className={className}>
      {activeChat ? <StyledChatUserIndex /> : <div></div>}
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
