import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import Relationship from '../Profile/Relationship';

function CancelFriendRequestButton({ user, setRelationship }) {
  function handleCancel(e) {
    e.preventDefault();

    const options = {
      onBefore: () => confirm(`Cancel friend request to ${profile.username}?`),
      onFinish: () => {
        setRelationship(Relationship.STRANGER);
      },
    };
    api.outgoingFriends.destroy({ obj: user, options: options });
  }

  return (
    <Link as="button" type="button" onClick={handleCancel}>
      Cancel Friend Request
    </Link>
  );
}

export default CancelFriendRequestButton;
