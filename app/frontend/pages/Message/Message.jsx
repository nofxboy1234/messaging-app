import styles from './Message.module.css';

export default function Message({ message }) {
  return (
    <div className={styles.message}>
      <div className={styles.username}>{message.user.email.toString()}</div>
      <div>{message.body.toString()}</div>
    </div>
  );
}
