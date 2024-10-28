import { Link, Head, router } from '@inertiajs/react';
import Profile from './Profile';
import Layout from '../Layout';
import { useState } from 'react';

export default function Show({ shared, profile, isFriend }) {
  const [isAFriend, setIsAFriend] = useState(isFriend);

  function handleAddFriend(e) {
    e.preventDefault();
    console.log('*** handleAddFriend');

    const data = { friendship: { friend_id: profile.user_id } };
    router.post('/friendships', data, {
      onFinish: (visit) => {
        console.log('*** onFinish post');
        setIsAFriend(true);
      },
    });
  }

  function handleRemoveFriend(e) {
    e.preventDefault();
    console.log('*** handleAddFriend');

    router.delete(`/friendships/${profile.user_id}`, {
      onBefore: (visit) => confirm(`Unfriend ${profile.username}?`),
      onFinish: (visit) => {
        console.log('*** onFinish delete');
        setIsAFriend(false);
      },
    });
  }

  return (
    <Layout>
      <Head title={`Profile #${profile.id}`} />

      {shared.flash.notice && (
        <p style={{ color: 'green' }}>{shared.flash.notice}</p>
      )}

      <h1>Profile #{profile.id}</h1>

      <Profile profile={profile} />

      <div>
        <Link href={`/profiles/${profile.id}/edit`}>Edit this profile</Link>

        <br />
      </div>
      <div>
        {isAFriend ? (
          <Link as="button" type="button" onClick={handleRemoveFriend}>
            Remove Friend
          </Link>
        ) : (
          <Link as="button" type="button" onClick={handleAddFriend}>
            Add Friend
          </Link>
        )}
      </div>
    </Layout>
  );
}
