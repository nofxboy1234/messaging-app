import { Head } from '@inertiajs/react';
import Friend from './Friend';
import Layout from '../Layout';

export default function Index({ friends }) {
  return (
    <Layout>
      <Head title="Friends" />

      <h1>Friends</h1>
      <div>
        {friends.map((friend) => (
          <div key={friend.id}>
            <Friend friend={friend} />
          </div>
        ))}
      </div>
    </Layout>
  );
}
