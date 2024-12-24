import { Link } from '@inertiajs/react';
import api from '../../../pathHelpers';
import PropTypes from 'prop-types';

function RejectFriendRequestButton({ friendRequest }) {
  function handleReject(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(
          `Reject friend request from ${friendRequest.user.profile.username}?`,
        ),
      onFinish: () => {
        api.rejectFriendRequestBroadcast.create({ data: friendRequest });
      },
    };

    api.friendRequests.destroy({ obj: friendRequest, options: options });
  }

  return (
    <Link as="button" type="button" onClick={handleReject}>
      Reject Friend Request
    </Link>
  );
}

RejectFriendRequestButton.propTypes = {
  friendRequest: PropTypes.object,
};

export default RejectFriendRequestButton;
