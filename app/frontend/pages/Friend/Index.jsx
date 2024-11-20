import { Link, Head } from '@inertiajs/react';
import Friend from './Friend';
import Layout from '../Layout';
import api from '../../pathHelpers';

export default function Index({ friends, flash }) {
  return (
    <Layout>
      <Head title="Friends" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Friends</h1>
      <div>
        {friends.map((friend) => (
          <div key={friend.id}>
            <Friend friend={friend} />
            <p>
              <Link href={api.profiles.show.path(friend.profile)}>
                View profile
              </Link>
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
