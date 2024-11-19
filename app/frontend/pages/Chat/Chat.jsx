import Layout from '../Layout';
import { useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';
import MessageDisplay from '../MessageDisplay/MessageDisplay';
import styles from './Index.module.css';
import { usePage } from '@inertiajs/react';
import api from '../../pathHelpers';

export default function Chat({ chat }) {
  const { shared } = usePage().props;

  const [values, setValues] = useState({
    message: '',
  });
  const [messages, setMessages] = useState(chat.messages);
  const [messageChannel, setMessageChannel] = useState(null);

  useEffect(() => {
    console.log('*** Chat useEffect');
    const consumer = createConsumer();
    const channel = consumer.subscriptions.create(
      { channel: 'ChatChannel', id: chat.id },
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
      console.log('*** Chat useEffect cleanup');
      channel.unsubscribe();
      consumer.disconnect();
    };
  }, [chat.id]);

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
      body: values.message,
      chat_id: chat.id,
    };

    api.messages.create({ data: data });
    clearMessage();
  }

  console.log('*** Chat rendering');

  return (
    <Layout>
      <div>Chat</div>

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
