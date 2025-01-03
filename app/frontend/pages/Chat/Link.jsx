import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ChatLink({ className, chat, friend }) {
  return (
    <div className={className}>
      <Link href={api.chats.show.path(chat)}>{friend.profile.username}</Link>
    </div>
  );
}

ChatLink.propTypes = {
  chat: PropTypes.object,
  friend: PropTypes.object,
};

const StyledChatLink = styled(ChatLink)`
  border: 1px solid black;
  background-color: #ffe46c;
`;

export default StyledChatLink;
