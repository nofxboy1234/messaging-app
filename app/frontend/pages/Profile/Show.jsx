import { usePage } from '@inertiajs/react';
import Profile from './Profile';
import UserActions from '../User/Actions';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import Layout from '../Layout';

function ProfileShow({ profile, initialRelationship }) {
  const { shared } = usePage().props;

  function currentUserProfile() {
    return shared.current_user.id === profile.user.id;
  }

  console.log('render Profile/Show');

  return (
    <div>
      <Profile profile={profile} />
      {currentUserProfile() ? (
        <Link href={api.profiles.edit.path(profile)}>Edit this profile</Link>
      ) : (
        <UserActions
          user={profile.user}
          initialRelationship={initialRelationship}
        />
      )}
    </div>
  );
}

ProfileShow.propTypes = {
  profile: PropTypes.object,
  initialRelationship: PropTypes.string,
};

ProfileShow.layout = (page) => <Layout>{page}</Layout>;

export default ProfileShow;
