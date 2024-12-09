import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import Relationship from '../Profile/Relationship';
import PropTypes from 'prop-types';

function RejectFriendRequestButton({ user }) {
  function handleReject(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Accept friend request from ${user.profile.username}?`),
      onFinish: () => {},
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
};

export default RejectFriendRequestButton;
