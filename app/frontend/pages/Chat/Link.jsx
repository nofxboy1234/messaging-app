import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function ChatLink({ chat }) {
  return <Link href={api.chats.show.path(chat)}>{chat.name}</Link>;
}

export default ChatLink;
