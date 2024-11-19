import { Link, Head } from '@inertiajs/react';
import IncomingFriend from './IncomingFriend';
import Layout from '../Layout';

export default function Index({ incoming_friends, flash }) {
  return (
    <Layout>
      <Head title="Incoming friends" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Incoming friends</h1>
      <div>
        {incoming_friends.map((incoming_friend) => (
          <div key={incoming_friend.id}>
            <IncomingFriend incoming_friend={incoming_friend} />
            <p>
              <Link href={`/incoming_friends/${incoming_friend.id}`}>
                Show this incoming friend
              </Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/incoming_friends/new">New incoming friend</Link>
    </Layout>
  );
}
