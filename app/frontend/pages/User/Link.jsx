import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import PropTypes from 'prop-types';

function UserLink({ user }) {
  console.log('render User/Link');

  return (
    <Link href={api.profiles.show.path(user.profile)}>
      {user.profile.username}
    </Link>
  );
}

UserLink.propTypes = {
  user: PropTypes.object,
};

export default UserLink;
