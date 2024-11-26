import { Head } from '@inertiajs/react';
import IncomingFriend from './IncomingFriend';

export default function Index({ incoming_friends }) {
  return (
    <>
      <Head title="Incoming Friend Requests" />

      <h1>Incoming Friend Requests</h1>
      <div>
        {incoming_friends.map((friend) => (
          <div key={friend.id}>
            <IncomingFriend friend={friend} />
          </div>
        ))}
      </div>
    </>
  );
}
