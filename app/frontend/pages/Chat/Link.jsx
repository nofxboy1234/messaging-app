import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ChatLink({ className, chat, friend }) {
  return (
    <div className={className} onClick={() => api.chats.show({ obj: chat })}>
      {friend.profile.username}
      {/* <Link href={api.chats.show.path(chat)}>{friend.profile.username}</Link> */}
    </div>
  );
}

ChatLink.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object,
  friend: PropTypes.object,
};

const StyledChatLink = styled(ChatLink)`
  border: 1px solid black;
  background-color: #ffe46c;
  border-radius: 5px;
  margin: 0.5rem;
  padding: 0.3rem;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

export default StyledChatLink;
