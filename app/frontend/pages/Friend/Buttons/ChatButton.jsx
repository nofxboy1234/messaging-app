import { Link } from '@inertiajs/react';
import api from '../../../pathHelpers';
import PropTypes from 'prop-types';

function ChatButton({ friend }) {
  function handleChat(e) {
    e.preventDefault();
    api.chats.create({ data: friend });
  }

  return (
    <Link as="button" type="button" onClick={handleChat}>
      Chat
    </Link>
  );
}

ChatButton.propTypes = {
  friend: PropTypes.object,
};

export default ChatButton;
