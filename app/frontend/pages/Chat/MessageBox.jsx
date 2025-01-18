import api from '../../pathHelpers';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function MessageBox({ className, chat }) {
  const [message, setMessage] = useState('');
  const { shared } = usePage().props;

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function clearMessage() {
    setMessage('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (message === '') return;

    const data = {
      body: message,
      chat_id: chat.id,
    };

    const options = {
      onFinish: () => {
        api.sendMessageBroadcast.create({
          data: { user_id: shared.current_user.id, chat_id: chat.id },
        });
      },
    };

    api.messages.create({ data: data, options: options });
    clearMessage();
  }

  return (
    <div id="message-box" className={className}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="message"
          autoFocus
          value={message}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

MessageBox.propTypes = {
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
