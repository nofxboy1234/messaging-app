import { Head } from '@inertiajs/react';
import OutgoingFriend from './OutgoingFriend';

export default function Index({ outgoing_friends }) {
  return (
    <>
      <Head title="Outgoing Friend Requests" />

      <h1>Outgoing Friend Requests</h1>
      <div>
        {outgoing_friends.map((friend) => (
          <div key={friend.id}>
            <OutgoingFriend friend={friend} />
          </div>
        ))}
      </div>
    </>
  );
}
