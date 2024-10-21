import Message from '../Message/Message';
import styles from './MessageDisplay.module.css';

function MessageDisplay({ messages }) {
  console.log('*** MessageDisplay');
  console.log(messages);

  return (
    <div className={styles.container}>
      <div id="message-display">
        {messages.map((message, index) => {
          console.log(message);
          return <Message key={message.id || index} message={message} />;
        })}
      </div>
    </div>
  );
}

export default MessageDisplay;
