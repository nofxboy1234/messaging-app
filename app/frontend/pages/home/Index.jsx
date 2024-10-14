import { router, Link } from '@inertiajs/react';
import Layout from '../Layout';
import { useEffect, useState } from 'react';
import { consumer } from '../../channels/message_channel';

function Home({ session }) {
  const [values, setValues] = useState({
    message: '',
  });
  const [messageChannel, setMessageChannel] = useState(null);

  useEffect(() => {
    console.log('*** Home useEffect');

    const channel = consumer.subscriptions.create('MessageChannel', {
      connected() {
        console.log('*** frontend message channel connected');
      },

      disconnected() {
        console.log('*** frontend message channel disconnected');
      },

      received(data) {
        console.log('*** frontend message channel received');
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

      <div id="message-display"></div>

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
