import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import Relationship from '../Profile/Relationship';

function SendFriendRequestButton({ user, setRelationship }) {
  function handleSendFriendRequest(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Send friend request to ${user.profile.username}?`),
      onFinish: () => {
        setRelationship(Relationship.OUTGOING_REQUEST);
      },
    };
    api.outgoingFriends.create({ data: user, options });
  }

  return (
    <Link as="button" type="button" onClick={handleSendFriendRequest}>
      Unfriend
    </Link>
  );
}

export default SendFriendRequestButton;