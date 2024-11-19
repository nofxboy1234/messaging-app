import { Link, Head, router } from '@inertiajs/react';
import Profile from './Profile';
import Layout from '../Layout';
import { useState } from 'react';
import api from '../../pathHelpers';

export default function Show({ shared, profile, isFriend, isPendingFriend }) {
  const [isAFriend, setIsAFriend] = useState(isFriend);
  const [isAPendingFriend, setIsAPendingFriend] = useState(isPendingFriend);

  function handleAddFriend(e) {
    e.preventDefault();

    const data = { friendship: { user_id: profile.user_id } };
    router.post('/friendships/pending', data, {
      onBefore: (visit) =>
        confirm(`Send friend request to ${profile.username}?`),
      onFinish: (visit) => {
        setIsAPendingFriend(true);
      },
    });
  }

  function handleRemovePendingFriend(e) {
    e.preventDefault();

    router.delete(`/friendships/pending/${profile.user_id}`, {
      onBefore: (visit) =>
        confirm(`Remove friend request to ${profile.username}?`),
      onFinish: (visit) => {
        setIsAPendingFriend(false);
      },
    });
  }

  function handleRemoveFriend(e) {
    e.preventDefault();

    const options = {
      onBefore: (visit) => confirm(`Unfriend ${profile.username}?`),
      onFinish: (visit) => {
        setIsAFriend(false);
      },
    };
    api.friends.destroy({ obj: profile.user, options });
  }

  let friendButton;
  if (isAFriend) {
    friendButton = (
      <Link as="button" type="button" onClick={handleRemoveFriend}>
        Remove Friend
      </Link>
    );
  } else if (isAPendingFriend) {
    friendButton = (
      <Link as="button" type="button" onClick={handleRemovePendingFriend}>
        Remove Friend Request
      </Link>
    );
  } else {
    friendButton =
      shared.current_user.id !== profile.user.id ? (
        <Link as="button" type="button" onClick={handleAddFriend}>
          Add Friend
        </Link>
      ) : null;
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
      <div>{friendButton}</div>
    </Layout>
  );
}
