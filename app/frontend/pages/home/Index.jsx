import { router, Link } from '@inertiajs/react';
import Layout from '../Layout';
import { useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';
import Message from '../Message/Message';

function Home({ session }) {
  const [values, setValues] = useState({
    message: '',
  });
  const [messages, setMessages] = useState([]);
  const [messageChannel, setMessageChannel] = useState(null);

  useEffect(() => {
    console.log('*** Home useEffect');

    // const actionCableUrl = 'ws://localhost:3100/websocket';

    // const actionCableUrl =
    //   process.env.NODE_ENV === 'production'
    //     ? 'wss://glacial-lowlands-89807-117906cec308.herokuapp.com/websocket'
    //     : 'ws://localhost:3100/websocket';
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
  }, []);

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (values.message === '') return;
    const message = {
      body: values.message,
    };
    messageChannel.send({ message: message });
  }

  console.log('*** Home rendering');

  return (
    <Layout>
      <div>Home</div>
      <Link
        href={`/sessions/${session.id}`}
        as="button"
        type="button"
        method="delete"
      >
        Log out
      </Link>

      <div id="message-display">
        {messages.map((message) => (
          <Message key={message.body} message={message} />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          id="message"
          value={values.message}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </Layout>
  );
}

export default Home;
