import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function IncomingFriendActions({ user }) {
  function handleAddIncomingFriend(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Accept friend request from ${user.profile.username}?`),
      onFinish: () => {
        api.friends.create({ data: user });
      },
    };

    api.incomingFriends.destroy({ obj: user, options: options });
  }

  function handleRemoveIncomingFriend(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Reject friend request from ${user.profile.username}?`),
    };
    api.incomingFriends.destroy({ obj: user, options: options });
  }

  return (
    <>
      <Link as="button" type="button" onClick={handleAddIncomingFriend}>
        Accept Friend Request
      </Link>
      <Link as="button" type="button" onClick={handleRemoveIncomingFriend}>
        Reject Friend Request
      </Link>
    </>
  );
}

export default IncomingFriendActions;
