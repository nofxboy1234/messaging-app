import { Head } from '@inertiajs/react';
import OutgoingFriend from './OutgoingFriend';
import Layout from '../Layout';

export default function Index({ outgoing_friends }) {
  return (
    <Layout>
      <Head title="Outgoing Friend Requests" />

      <h1>Outgoing Friend Requests</h1>
      <div>
        {outgoing_friends.map((friend) => (
          <div key={friend.id}>
            <OutgoingFriend friend={friend} />
          </div>
        ))}
      </div>
    </Layout>
  );
}
