import { Link } from '@inertiajs/react';
import api from '../../../pathHelpers';
import PropTypes from 'prop-types';

function AcceptFriendRequestButton({ friendRequest }) {
  function handleAccept(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(
          `Accept friend request from ${friendRequest.user.profile.username}?`,
        ),
      onFinish: () => {
        api.friends.create({ data: friendRequest.user });
      },
    };

    api.friendRequests.destroy({ obj: friendRequest, options: options });
  }

  return (
    <Link as="button" type="button" onClick={handleAccept}>
      Accept Friend Request
    </Link>
  );
}

AcceptFriendRequestButton.propTypes = {
  friendRequest: PropTypes.object,
};

export default AcceptFriendRequestButton;
