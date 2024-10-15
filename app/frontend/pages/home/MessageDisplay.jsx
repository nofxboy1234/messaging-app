import Message from '../Message/Message';

function MessageDisplay({ messages }) {
  return (
    <div id="message-display">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

export default MessageDisplay;
