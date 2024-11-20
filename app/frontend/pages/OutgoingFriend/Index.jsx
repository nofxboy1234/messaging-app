import { Link, Head } from '@inertiajs/react';
import OutgoingFriend from './OutgoingFriend';
import Layout from '../Layout';

export default function Index({ outgoing_friends, flash }) {
  return (
    <Layout>
      <Head title="Outgoing friends" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Outgoing friends</h1>
      <div>
        {outgoing_friends.map((outgoing_friend) => (
          <div key={outgoing_friend.id}>
            <OutgoingFriend outgoing_friend={outgoing_friend} />
            <p>
              <Link href={`/outgoing_friends/${outgoing_friend.id}`}>
                Show this outgoing friend
              </Link>
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
