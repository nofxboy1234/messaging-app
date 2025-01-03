import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

function UserLink({ user, targetPath }) {
  return <Link href={targetPath}>{user.profile.username}</Link>;
}

UserLink.propTypes = {
  user: PropTypes.object,
  targetPath: PropTypes.string,
};

export default UserLink;
