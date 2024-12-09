import { Link } from '@inertiajs/react';
import api from '../../../pathHelpers';
import PropTypes from 'prop-types';

function CancelFriendRequestButton({ friendRequest }) {
  function handleCancel(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(
          `Cancel friend request to ${friendRequest.friend.profile.username}?`,
        ),
      onFinish: () => {},
    };

    api.friendRequests.destroy({ obj: friendRequest, options: options });
  }

  return (
    <Link as="button" type="button" onClick={handleCancel}>
      Cancel Friend Request
    </Link>
  );
}

CancelFriendRequestButton.propTypes = {
  friendRequest: PropTypes.object,
};

export default CancelFriendRequestButton;
