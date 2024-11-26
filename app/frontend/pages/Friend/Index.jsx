import { Head } from '@inertiajs/react';
import Friend from './Friend';

export default function Index({ friends }) {
  return (
    <>
      <Head title="Friends" />

      <h1>Friends</h1>
      <div>
        {friends.map((friend) => (
          <div key={friend.id}>
            <Friend friend={friend} />
          </div>
        ))}
      </div>
    </>
  );
}
