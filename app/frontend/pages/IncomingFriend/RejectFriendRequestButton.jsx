import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import Relationship from '../Profile/Relationship';

function RejectFriendRequestButton({ user, setRelationship }) {
  function handleReject(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Accept friend request from ${user.profile.username}?`),
      onFinish: () => {
        api.friends.create({ data: user });
        setRelationship(Relationship.STRANGER);
      },
    };

    api.incomingFriends.destroy({ obj: user, options: options });
  }

  return (
    <Link as="button" type="button" onClick={handleReject}>
      Reject Friend Request
    </Link>
  );
}

export default RejectFriendRequestButton;
