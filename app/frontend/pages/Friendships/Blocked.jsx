import { Link, Head, router } from '@inertiajs/react';
import Layout from '../Layout';
import { useState } from 'react';

export default function Index({ shared, blocked_friends }) {
  const [currentBlockedFriends, setCurrentBlockedFriends] =
    useState(blocked_friends);

  function handleUnblockFriend(friend) {
    router.delete(`/friendships/${friend.id}`, {
      onBefore: (visit) => confirm(`Unblock ${friend.profile.username}?`),
      onFinish: (visit) => {
        setCurrentBlockedFriends(
          currentBlockedFriends.filter((user) => user.id != friend.id),
        );
      },
    });
  }

  return (
    <Layout>
      <Head title={'All Friends'} />

      <h1>ALL FRIENDS - </h1>

      <div>
        {currentBlockedFriends.map((friend) => (
          <div key={friend.id}>
            <div>{friend.profile.picture}</div>
            <div>{friend.profile.username}</div>
            <Link
              as="button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleUnblockFriend(friend);
              }}
            >
              Unblock Friend
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
