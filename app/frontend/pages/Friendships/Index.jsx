import { Link, Head } from '@inertiajs/react';
import Layout from '../Layout';

export default function Index({ shared, friends }) {
  return (
    <Layout>
      <Head title={'All Friends'} />

      <h1>ALL FRIENDS - </h1>

      <div>
        {friends.map((friend) => (
          <div key={friend.id}>
            <div>{friend.profile.picture}</div>
            <div>{friend.profile.username}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
