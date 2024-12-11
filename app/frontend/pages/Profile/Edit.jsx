import { Link } from '@inertiajs/react';
import ProfileForm from './Form';
import api from '../../pathHelpers';
import PropTypes from 'prop-types';

function ProfileEdit({ profile }) {
  return (
    <div>
      <ProfileForm
        profile={profile}
        onSubmit={(form) => {
          form.transform((data) => ({ profile: data }));
          form.patch(`/profiles/${profile.id}`);
        }}
        submitText="Update profile"
      />

      <br />

      <div>
        <Link href={api.profiles.show.path(profile)}>Show this profile</Link>
      </div>
    </div>
  );
}

ProfileEdit.propTypes = {
  profile: PropTypes.object,
};

export default ProfileEdit;
