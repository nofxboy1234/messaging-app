import { Link } from '@inertiajs/react';
import api from '../../../pathHelpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ChatButton({ className, chat }) {
  function handleChat(e) {
    e.preventDefault();

    api.chats.show({ obj: chat });
  }

  return (
    <Link className={className} as="button" type="button" onClick={handleChat}>
      Chat
    </Link>
  );
}

ChatButton.propTypes = {
  chat: PropTypes.object,
};

const StyledChatButton = styled(ChatButton)`
  --bg-color: white;
  --fg-color: #bf4f74;

  background-color: var(--bg-color);
  color: var(--fg-color);
  font-size: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid var(--fg-color);
  border-radius: 3px;
  cursor: pointer;
  margin: 1rem;

  &:hover {
    background-color: var(--fg-color);
    color: var(--bg-color);
  }
`;

export default StyledChatButton;
