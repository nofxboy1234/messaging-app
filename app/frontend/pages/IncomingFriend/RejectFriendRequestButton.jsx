import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import Relationship from '../Profile/Relationship';
import PropTypes from 'prop-types';

function RejectFriendRequestButton({ user, setRelationship }) {
  function handleReject(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Accept friend request from ${user.profile.username}?`),
      onFinish: () => {
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

RejectFriendRequestButton.propTypes = {
  user: PropTypes.object,
  setRelationship: PropTypes.func,
};

export default RejectFriendRequestButton;
