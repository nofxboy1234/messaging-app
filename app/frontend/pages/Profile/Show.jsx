import { usePage } from '@inertiajs/react';
import Profile from './Profile';
import UserActions from '../User/Actions';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function ProfileShow({ profile, relationship, friendRequest }) {
  const { shared } = usePage().props;

  function currentUserProfile() {
    return shared.current_user.id === profile.user.id;
  }

  return (
    <div>
      <Profile profile={profile} />
      {currentUserProfile() ? (
        <Link href={api.profiles.edit.path(profile)}>Edit this profile</Link>
      ) : (
        <UserActions
          user={profile.user}
          relationship={relationship}
          friendRequest={friendRequest}
        />
      )}
    </div>
  );
}

ProfileShow.propTypes = {
  profile: PropTypes.object,
  relationship: PropTypes.string,
  friendRequest: PropTypes.object,
};

export default ProfileShow;
