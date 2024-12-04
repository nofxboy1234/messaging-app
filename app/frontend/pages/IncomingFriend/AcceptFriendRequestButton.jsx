import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import Relationship from '../Profile/Relationship';
import PropTypes from 'prop-types';

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

AcceptFriendRequestButton.propTypes = {
  user: PropTypes.object,
  setRelationship: PropTypes.func,
};

export default AcceptFriendRequestButton;
