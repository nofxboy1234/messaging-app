import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SendMessageButton from './Buttons/SendMessageButton';

function MessageBox({ className, chat }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div id="message-box" className={className}>
      <form>
        <input
          autoFocus
          ref={inputRef}
          type="text"
          id="message"
          value={message}
          onChange={handleChange}
        />
        <SendMessageButton
          message={message}
          setMessage={setMessage}
          chat={chat}
          inputRef={inputRef}
        />
      </form>
    </div>
  );
}

MessageBox.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object,
};

const StyledMessageBox = styled(MessageBox)`
  padding: 1rem 0;

  form {
    flex: 1 1 0;
    display: flex;
    flex-wrap: wrap;
  }

  input {
    flex: 1 1 0;

    font-family: 'JetbrainsMono', monospace;
    font-size: 1rem;

    border: 1px solid #e4e4e4;
    color: var(--medium-grey);

    padding: 1rem;
    min-width: 130px;
  }
`;

export default StyledMessageBox;
