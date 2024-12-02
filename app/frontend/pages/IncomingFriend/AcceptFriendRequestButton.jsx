import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import Relationship from '../Profile/Relationship';

function AcceptFriendRequestButton({ user, setRelationship }) {
  function handleAccept(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Accept friend request from ${user.profile.username}?`),
      onFinish: () => {
        api.friends.create({ data: user });
        setRelationship(Relationship.FRIEND);
      },
    };

    api.incomingFriends.destroy({ obj: user, options: options });
  }

  return (
    <Link as="button" type="button" onClick={handleAccept}>
      Accept Friend Request
    </Link>
  );
}

export default AcceptFriendRequestButton;
