import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function IncomingFriendActions({ user }) {
  function acceptFriendRequest(e) {
    e.preventDefault();

    const options = {
      // onBefore: () =>
      //   confirm(`Accept friend request from ${user.profile.username}?`),
      onFinish: () => {
        api.friends.create({ data: user, options: options });
      },
    };

    api.incomingFriends.destroy({ obj: user, options: options });
  }

  function rejectFriendRequest(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Reject friend request from ${user.profile.username}?`),
    };

    api.incomingFriends.destroy({ obj: user, options: options });
  }

  return (
    <>
      <Link as="button" type="button" onClick={acceptFriendRequest}>
        Accept Friend Request
      </Link>
      <Link as="button" type="button" onClick={rejectFriendRequest}>
        Reject Friend Request
      </Link>
    </>
  );
}

export default IncomingFriendActions;
