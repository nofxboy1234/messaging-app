import { Link, Head, router } from '@inertiajs/react';
import Layout from '../Layout';

export default function Index({ shared, outgoing, incoming }) {
  function acceptFriendRequest(user) {
    const data = { friendship: { user_id: user.id } };
    router.post(`/friendships`, data, {
      onBefore: (visit) =>
        confirm(`Accept friend request from ${user.profile.username}?`),
      onFinish: (visit) => {
        console.log('Friend request accepted');
      },
    });
  }

  return (
    <Layout>
      <Head title={'Pending Friends'} />

      <h1>Outgoing Friend Requests - </h1>
      <div>
        {outgoing.map((user) => (
          <div key={user.id}>
            <div>{user.profile.picture}</div>
            <div>{user.profile.username}</div>
          </div>
        ))}
      </div>

      <h1>Incoming Friend Requests - </h1>
      <div>
        {incoming.map((user) => (
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
            <Link as="button" type="button">
              Reject
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
