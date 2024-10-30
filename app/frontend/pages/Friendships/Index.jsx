import { Link, Head, router } from '@inertiajs/react';
import Layout from '../Layout';
import { useState } from 'react';

export default function Index({ shared, friends }) {
  const [currentFriends, setCurrentFriends] = useState(friends);

  function handleRemoveFriend(friend) {
    router.delete(`/friendships/accepted/${friend.id}`, {
      onBefore: (visit) => confirm(`Unfriend ${friend.profile.username}?`),
      onFinish: (visit) => {
        console.log('*** handleRemoveFriend');
        setCurrentFriends(
          currentFriends.filter((user) => user.id != friend.id),
        );
      },
    });
  }

  function handleBlockFriend(friend) {
    router.patch(
      `/friendships/${friend.id}`,
      {},
      {
        onBefore: (visit) => confirm(`Block ${friend.profile.username}?`),
        onFinish: (visit) => {
          console.log('*** handleBlockFriend');
          const filtered = currentFriends.filter(
            (user) => user.id != friend.id,
          );
          setCurrentFriends(filtered);
        },
      },
    );
  }

  return (
    <Layout>
      <Head title={'All Friends'} />

      <h1>ALL FRIENDS - </h1>

      <div>
        {currentFriends.map((friend) => (
          <div key={friend.id}>
            <div>{friend.profile.picture}</div>
            <div>{friend.profile.username}</div>
            <Link
              as="button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleRemoveFriend(friend);
              }}
            >
              Remove Friend
            </Link>
            <Link
              as="button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleBlockFriend(friend);
              }}
            >
              Block Friend
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
