import Message from '../Message/Message';
import styles from './MessageDisplay.module.css';
function MessageDisplay({ messages }) {
  return (
    <div id="message-display" className={styles.messageDisplay}>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

export default MessageDisplay;
