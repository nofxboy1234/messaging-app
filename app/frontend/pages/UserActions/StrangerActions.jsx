import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function StrangerActions({ user }) {
  function sendFriendRequest(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Send friend request to ${user.profile.username}?`),
    };
    api.outgoingFriends.create({ data: user, options: options });
  }

  return (
    <>
      <Link as="button" type="button" onClick={sendFriendRequest}>
        Send Friend Request
      </Link>
    </>
  );
}

export default StrangerActions;
