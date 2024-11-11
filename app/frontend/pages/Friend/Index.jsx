import { Link, Head } from '@inertiajs/react';
import Friend from './Friend';

export default function Index({ friends, flash }) {
  return (
    <>
      <Head title="Friends" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Friends</h1>
      <div>
        {friends.map((friend) => (
          <div key={friend.id}>
            <Friend friend={friend} />
            <p>
              <Link href={`/friends/${friend.id}`}>Show this friend</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/friends/new">New friend</Link>
    </>
  );
}
