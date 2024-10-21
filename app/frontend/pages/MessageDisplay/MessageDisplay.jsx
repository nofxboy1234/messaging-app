import Message from '../Message/Message';
import styles from './MessageDisplay.module.css';

function MessageDisplay({ messages }) {
  return (
    <div className={styles.container}>
      <div id="message-display">
        {messages.map((message, index) => {
          return <Message key={message.id || index} message={message} />;
        })}
      </div>
    </div>
  );
}

export default MessageDisplay;
