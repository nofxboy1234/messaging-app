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
          const options = {
            onFinish: () => {
              api.profileBroadcast.create({ data: profile });
            },
          };

          form.transform((data) => ({ profile: data }));
          form.patch(api.profiles.update.path(profile), options);
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
