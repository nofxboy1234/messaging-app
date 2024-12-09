import { Link, usePage } from '@inertiajs/react';
import api from '../../../pathHelpers';
import PropTypes from 'prop-types';

function SendFriendRequestButton({ user }) {
  const { shared } = usePage().props;

  function handleSendFriendRequest(e) {
    e.preventDefault();

    const options = {
      onBefore: () =>
        confirm(`Send friend request to ${user.profile.username}?`),
      onFinish: () => {},
    };

    const data = {
      user_id: shared.current_user.id,
      friend_id: user.id,
    };

    api.friendRequests.create({ data: data, options });
  }

  return (
    <Link as="button" type="button" onClick={handleSendFriendRequest}>
      Send Friend Request
    </Link>
  );
}

SendFriendRequestButton.propTypes = {
  user: PropTypes.object,
};

export default SendFriendRequestButton;
