import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SendMessageButton from './Buttons/SendMessageButton';
import sendMessage from './Buttons/sendMessage';
import MessageInput from './MessageInput';

function MessageBox({ className, chat }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSendMessage() {
    sendMessage(message, chat);
    setMessage('');
    inputRef.current.focus();
  }

  return (
    <div id="message-box" className={className}>
      <form>
        <MessageInput
          ref={inputRef}
          message={message}
          onChange={handleChange}
        />
        <SendMessageButton onClick={handleSendMessage} />
      </form>
    </div>
  );
}

MessageBox.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object,
};

const StyledMessageBox = styled(MessageBox)`
  padding: 1rem;
  border-top: 1px solid var(--border-color);

  form {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export default StyledMessageBox;
