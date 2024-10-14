import { router, Link } from '@inertiajs/react';
import Layout from '../Layout';
import { useEffect, useState } from 'react';
import { consumer } from '../../channels/message_channel';

function Home({ session }) {
  const [values, setValues] = useState({
    message: '',
  });

  useEffect(() => {
    console.log('*** Home useEffect');

    const messageChannel = consumer.subscriptions.create('MessageChannel', {
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
    console.log('handleSubmit');
    // router.post('/sign_in', values);
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
        <button type="submit">Log in</button>
      </form>
    </Layout>
  );
}

export default Home;
