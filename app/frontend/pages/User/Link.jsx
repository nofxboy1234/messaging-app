import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function UserLink({ user }) {
  return (
    <Link href={api.profiles.show.path(user.profile)}>
      {user.profile.username}
    </Link>
  );
}

export default UserLink;
