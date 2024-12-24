import { Link } from '@inertiajs/react';
import api from '../../../pathHelpers';
import PropTypes from 'prop-types';

function UnfriendButton({ friendship, user }) {
  // const { setChats } = useContext(LayoutContext);
  // const { shared } = usePage().props;

  function handleUnfriend(e) {
    e.preventDefault();

    const options = {
      onBefore: () => confirm(`Unfriend ${user.profile.username}?`),
      onFinish: () => {
        api.unfriendBroadcast.create({ data: friendship });
      },
    };

    api.friendships.destroy({
      obj: friendship,
      options: options,
    });
  }

  return (
    <Link as="button" type="button" onClick={handleUnfriend}>
      Unfriend
    </Link>
  );
}

UnfriendButton.propTypes = {
  friendship: PropTypes.object,
  user: PropTypes.object,
};

export default UnfriendButton;
