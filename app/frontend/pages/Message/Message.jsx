import styles from './Message.module.css';
import Picture from '../Profile/Picture';

function Message({ message }) {
  return (
    <div>
      <Picture src={message.user.profile.picture} />
      <div>{message.user.profile.username}</div>
      <div>{message.body}</div>
    </div>
  );
}

export default Message;
