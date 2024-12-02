import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function ChatButton({ friend, setRelationship }) {
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

export default ChatButton;
