import api from '../../../pathHelpers';

function sendMessage({ message, chat }) {
  if (message === '') return;

  const data = {
    body: message,
    chat_id: chat.id,
  };

  api.messages.create({ data: data });
}

export default sendMessage;
