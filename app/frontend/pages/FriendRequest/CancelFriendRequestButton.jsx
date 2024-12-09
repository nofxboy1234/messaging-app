import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import Relationship from '../Profile/Relationship';
import PropTypes from 'prop-types';

function CancelFriendRequestButton({ user }) {
  function handleCancel(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Cancel friend request to ${user.profile.username}?`),
      onFinish: () => {},
    };
    api.outgoingFriends.destroy({ obj: user, options: options });
  }

  return (
    <Link as="button" type="button" onClick={handleCancel}>
      Cancel Friend Request
    </Link>
  );
}

CancelFriendRequestButton.propTypes = {
  user: PropTypes.object,
};

export default CancelFriendRequestButton;
