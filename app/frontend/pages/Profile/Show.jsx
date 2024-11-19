import { Link, Head, router } from '@inertiajs/react';
import Profile from './Profile';
import Layout from '../Layout';
import { useState } from 'react';
import api from '../../pathHelpers';

export default function Show({
  shared,
  profile,
  isFriend,
  isOutgoingFriend,
  isIncomingFriend,
}) {
  const [isAFriend, setIsAFriend] = useState(isFriend);
  const [isAnOutgoingFriend, setIsAnOutgoingFriend] =
    useState(isOutgoingFriend);
  const [isAnIncomingFriend, setIsAnIncomingFriend] =
    useState(isIncomingFriend);

  function handleAddFriend(e) {
    e.preventDefault();

    const data = { user_id: profile.user_id };

    const options = {
      onBefore: (visit) =>
        confirm(`Send friend request to ${profile.username}?`),
      onFinish: (visit) => {
        setIsAnOutgoingFriend(true);
      },
    };
    api.friends.create({ data: data, options: options });
  }

  function handleRemoveFriend(e) {
    e.preventDefault();

    const options = {
      onBefore: (visit) => confirm(`Unfriend ${profile.username}?`),
      onFinish: (visit) => {
        setIsAFriend(false);
      },
    };
    api.friends.destroy({ obj: profile.user, options: options });
  }

  function handleRemoveOutgoingFriend(e) {
    e.preventDefault();

    const options = {
      onBefore: (visit) =>
        confirm(`Remove friend request to ${profile.username}?`),
      onFinish: (visit) => {
        setIsAnOutgoingFriend(false);
      },
    };
    api.outgoingFriends.destroy({ obj: profile.user, options: options });
  }

  function handleRemoveIncomingFriend(e) {
    e.preventDefault();

    const options = {
      onBefore: (visit) =>
        confirm(`Reject friend request from ${profile.username}?`),
      onFinish: (visit) => {
        setIsAnIncomingFriend(false);
      },
    };
    api.incomingFriends.destroy({ obj: profile.user, options: options });
  }

  function friendButton() {
    let friendButton;
    if (isAFriend) {
      friendButton = (
        <Link as="button" type="button" onClick={handleRemoveFriend}>
          Remove Friend
        </Link>
      );
    } else if (isAnOutgoingFriend) {
      friendButton = (
        <Link as="button" type="button" onClick={handleRemoveOutgoingFriend}>
          Remove Friend Request
        </Link>
      );
    } else if (isAnIncomingFriend) {
      friendButton = (
        <Link as="button" type="button" onClick={handleRemoveIncomingFriend}>
          Reject Friend Request
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

    return friendButton;
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
      <div>{friendButton()}</div>
    </Layout>
  );
}
