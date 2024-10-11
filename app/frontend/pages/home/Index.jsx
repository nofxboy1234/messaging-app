import { Link } from '@inertiajs/react';
import Layout from '../Layout';
import { useEffect } from 'react';
import { consumer, messageChannel } from '../../channels/message_channel';

function Home({ session }) {
  useEffect(() => {
    console.log('*** Home useEffect');
    consumer.connect();
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
