import Layout from '../Layout';
import { useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';
import MessageDisplay from './MessageDisplay';

function Home() {
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

      received(data) {
        console.log('*** frontend message channel received');

        const message = data.message;
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
    const message = {
      body: values.message,
    };
    messageChannel.send({ message: message });
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
