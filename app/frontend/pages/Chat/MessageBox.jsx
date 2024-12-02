import api from '../../pathHelpers';
import { useState } from 'react';

function MessageBox({ chat }) {
  const [message, setMessage] = useState('');

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

    api.messages.create({ data: data });
    clearMessage();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message:</label>
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

export default MessageBox;
