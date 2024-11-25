import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function OutgoingFriendActions({ user }) {
  function cancelFriendRequest(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Cancel friend request to ${user.profile.username}?`),
    };
    api.outgoingFriends.destroy({ obj: user.profile.user, options: options });
  }

  return (
    <>
      <Link as="button" type="button" onClick={cancelFriendRequest}>
        Cancel Friend Request
      </Link>
    </>
  );
}

export default OutgoingFriendActions;
