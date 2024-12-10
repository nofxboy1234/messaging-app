import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import PropTypes from 'prop-types';

function ChatLink({ chat, friend }) {
  return (
    <div>
      <Link href={api.chats.show.path(chat)}>{friend.profile.username}</Link>
    </div>
  );
}

ChatLink.propTypes = {
  chat: PropTypes.object,
  friend: PropTypes.object,
};

export default ChatLink;
