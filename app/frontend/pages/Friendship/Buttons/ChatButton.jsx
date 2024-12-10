import { Link } from '@inertiajs/react';
import api from '../../../pathHelpers';
import PropTypes from 'prop-types';

function ChatButton({ friendship }) {
  function handleChat(e) {
    e.preventDefault();

    const data = { friendship: { ...friendship } };
    api.chats.create({ data: data });
  }

  return (
    <Link as="button" type="button" onClick={handleChat}>
      Chat
    </Link>
  );
}

ChatButton.propTypes = {
  friendship: PropTypes.object,
};

export default ChatButton;
