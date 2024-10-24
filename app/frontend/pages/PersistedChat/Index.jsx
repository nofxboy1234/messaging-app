import Layout from '../Layout';
import { useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';
import MessageDisplay from '../MessageDisplay/MessageDisplay';
import styles from './Index.module.css';
import { router } from '@inertiajs/react';

function PersistedChat({ shared, messages: savedMessages }) {
  const [values, setValues] = useState({
    message: '',
  });
  const [messages, setMessages] = useState(savedMessages);
  const [messageChannel, setMessageChannel] = useState(null);

  useEffect(() => {
    console.log('*** PersistedChat useEffect');
    const consumer = createConsumer();
    const channel = consumer.subscriptions.create(
      { channel: 'ChatChannel', id: chatModel.id },
      {
        connected() {
          console.log('*** frontend message channel connected');
        },

        disconnected() {
          console.log('*** frontend message channel disconnected');
        },

        received(message) {
          console.log('*** frontend message channel received');

          setMessages((messages) => [...messages, message]);
        },
      },
    );

    setMessageChannel(channel);

    return () => {
      console.log('*** PersistedChat useEffect cleanup');
      channel.unsubscribe();
      consumer.disconnect();
    };
  }, []);

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  function clearMessage() {
    setValues((values) => ({
      ...values,
      message: '',
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (values.message === '') return;
    const data = {
      message: { body: values.message },
    };
    router.post('/messages', data);
    clearMessage();
  }

  console.log('*** PersistedChat rendering');

  return (
    <Layout>
      <div>PersistedChat</div>

      <MessageDisplay messages={messages} />

      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message:</label>
        <input
          className={styles.messageInput}
          type="text"
          id="message"
          autoFocus
          value={values.message}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </Layout>
  );
}

export default PersistedChat;
