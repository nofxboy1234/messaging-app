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

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div id="message-box" className={className}>
      <form>
        <input
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
  form {
    flex: 1 1 0;
    display: flex;
  }

  input {
    flex: 1 1 0;
  }
`;

export default StyledMessageBox;
