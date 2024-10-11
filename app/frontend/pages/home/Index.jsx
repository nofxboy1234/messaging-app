import { Link } from '@inertiajs/react';
import Layout from '../Layout';
import { useEffect } from 'react';
import { consumer } from '../../channels/message_channel';

function Home({ session }) {
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
    </Layout>
  );
}

export default Home;
