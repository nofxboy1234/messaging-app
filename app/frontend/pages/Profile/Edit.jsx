import ProfileForm from './Form';
import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import ShowProfileButton from './Buttons/ShowProfileButton';

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

      <ShowProfileButton profile={profile} />
    </div>
  );
}

ProfileEdit.propTypes = {
  profile: PropTypes.object,
};

export default ProfileEdit;
