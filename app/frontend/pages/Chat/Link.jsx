import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import PropTypes from 'prop-types';

function ChatLink({ chat }) {
  console.log('render Chat/Link');

  return <Link href={api.chats.show.path(chat)}>{chat.name}</Link>;
}

ChatLink.propTypes = {
  chat: PropTypes.object,
};

export default ChatLink;
