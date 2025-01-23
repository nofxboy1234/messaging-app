import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SendMessageButton from './Buttons/SendMessageButton';
import { usePage } from '@inertiajs/react';
import api from '../../pathHelpers';

function MessageBox({ className, chat }) {
  const [message, setMessage] = useState('');
  const { shared } = usePage().props;

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function clearMessage() {
    setMessage('');
  }

  function handleSubmit() {
    console.log('handleSubmit');

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
      <form>
        <input
          type="text"
          id="message"
          autoFocus
          value={message}
          onChange={handleChange}
        />
        <SendMessageButton onClick={handleSubmit} />
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
