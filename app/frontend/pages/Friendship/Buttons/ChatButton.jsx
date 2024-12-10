import { Link } from '@inertiajs/react';
import api from '../../../pathHelpers';
import PropTypes from 'prop-types';

function ChatButton({ chat }) {
  function handleChat(e) {
    e.preventDefault();

    api.chats.show({ obj: chat });
  }

  return (
    <Link as="button" type="button" onClick={handleChat}>
      Chat
    </Link>
  );
}

ChatButton.propTypes = {
  chat: PropTypes.object,
};

export default ChatButton;
