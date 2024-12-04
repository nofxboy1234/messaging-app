import Picture from './Picture';
import api from '../../pathHelpers';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

function Profile({ currentUser, profile }) {
  function currentUserProfile() {
    return currentUser.id === profile.user.id;
  }

  console.log('render Profile/Profile');

  return (
    <div>
      <div>
        <Picture src={profile.picture} />
        <div>{profile.username}</div>
        <div>{profile.about}</div>
      </div>
      {currentUserProfile() ? (
        <Link href={api.profiles.edit.path(profile)}>Edit this profile</Link>
      ) : null}
    </div>
  );
}

Profile.propTypes = {
  currentUser: PropTypes.object,
  profile: PropTypes.object,
};

export default Profile;
