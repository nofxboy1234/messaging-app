import { usePage } from '@inertiajs/react';
import Profile from './Profile';
import UserActions from '../User/Actions';
import PropTypes from 'prop-types';

function ProfileShow({ profile, initialRelationship }) {
  const { shared } = usePage().props;

  console.log('render Profile/Show');

  return (
    <div>
      <Profile currentUser={shared.current_user} profile={profile} />
      <UserActions
        user={profile.user}
        initialRelationship={initialRelationship}
      />
    </div>
  );
}

ProfileShow.propTypes = {
  profile: PropTypes.object,
  initialRelationship: PropTypes.string,
};

export default ProfileShow;
