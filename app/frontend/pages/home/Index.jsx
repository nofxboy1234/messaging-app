import Layout from '../Layout';
import { useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';
import MessageDisplay from '../MessageDisplay/MessageDisplay';
import styles from './Index.module.css';

function Home({ shared }) {
  const [values, setValues] = useState({
    message: '',
  });
  const [messages, setMessages] = useState([]);
  const [messageChannel, setMessageChannel] = useState(null);

  useEffect(() => {
    console.log('*** Home useEffect');
    const consumer = createConsumer();
    const channel = consumer.subscriptions.create('MessageChannel', {
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
    });

    setMessageChannel(channel);

    return () => {
      console.log('*** Home useEffect cleanup');
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
      message: { user: shared.current_user, body: values.message },
    };
    messageChannel.send(data);
    clearMessage();
  }

  console.log('*** Home rendering');

  return (
    <Layout>
      <div>Home</div>

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

export default Home;
