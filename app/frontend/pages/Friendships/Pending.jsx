import { Link, Head, router } from '@inertiajs/react';
import Layout from '../Layout';
import { useState } from 'react';

export default function Index({ shared, outgoing, incoming }) {
  const [outgoingRequests, setOutgoingRequests] = useState(outgoing);
  const [incomingRequests, setIncomingRequests] = useState(incoming);

  function acceptFriendRequest(user) {
    const data = { friendship: { user_id: user.id } };
    router.post(`/friendships`, data, {
      onBefore: (visit) =>
        confirm(`Accept friend request from ${user.profile.username}?`),
      onFinish: (visit) => {
        const filtered = incomingRequests.filter(
          (request) => request.id != user.id,
        );
        setIncomingRequests(filtered);
      },
    });
  }

  function rejectFriendRequest(user) {
    router.delete(`/friendships/pending/${user.id}`, {
      onBefore: (visit) =>
        confirm(`Reject friend request from ${user.profile.username}?`),
      onFinish: (visit) => {
        const filtered = incomingRequests.filter(
          (request) => request.id != user.id,
        );
        setIncomingRequests(filtered);
      },
    });
  }

  function handleRemovePendingFriend(user) {
    router.delete(`/friendships/pending/${user.id}`, {
      onBefore: (visit) =>
        confirm(`Cancel friend request to ${user.profile.username}?`),
      onFinish: (visit) => {
        const filtered = incomingRequests.filter(
          (request) => request.id != user.id,
        );
        setIncomingRequests(filtered);
      },
    });
  }

  console.log('*** rendering Pending');

  return (
    <Layout>
      <Head title={'Pending Friends'} />

      <h1>Outgoing Friend Requests - </h1>
      <div>
        {outgoingRequests.map((user) => (
          <div key={user.id}>
            <div>{user.profile.picture}</div>
            <div>{user.profile.username}</div>
            <Link
              as="button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleRemovePendingFriend(user);
              }}
            >
              Cancel
            </Link>
          </div>
        ))}
      </div>

      <h1>Incoming Friend Requests - </h1>
      <div>
        {incomingRequests.map((user) => (
          <div key={user.id}>
            <div>{user.profile.picture}</div>
            <div>{user.profile.username}</div>
            <Link
              as="button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                acceptFriendRequest(user);
              }}
            >
              Accept
            </Link>
            <Link
              as="button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                rejectFriendRequest(user);
              }}
            >
              Reject
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
