import { useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';
import MessageDisplay from '../MessageDisplay/MessageDisplay';
import styles from './Index.module.css';
import { Head } from '@inertiajs/react';
import api from '../../pathHelpers';
import Layout from '../Layout';

export default function Chat({ chat }) {
  const [values, setValues] = useState({
    message: '',
  });
  const [messages, setMessages] = useState(chat.messages);
  const [messageChannel, setMessageChannel] = useState(null);

  useEffect(() => {
    const consumer = createConsumer();
    const channel = consumer.subscriptions.create(
      { channel: 'ChatChannel', id: chat.id },
      {
        connected() {},

        disconnected() {},

        received(message) {
          setMessages((messages) => [...messages, message]);
        },
      },
    );

    setMessageChannel(channel);

    return () => {
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

  return (
    <>
      <Head title="Friends" />

      <h1>{chat.name}</h1>

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
    </>
  );
}

// Chat.layout = (page) => <Layout users={chat.members}>{page}</Layout>;
// Chat.layout = (page) => <Layout children={page} users={chat.members} />;
