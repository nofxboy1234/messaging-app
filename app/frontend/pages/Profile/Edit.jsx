import ProfileForm from './Form';
import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ProfileEdit({ className, profile }) {
  return (
    <div id="profile-edit" className={className}>
      <div id="profile-container">
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
      </div>
      <div id="spacer"></div>
    </div>
  );
}

ProfileEdit.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
};

const StyledProfileEdit = styled(ProfileEdit)`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin-top: 1rem;

  & #profile-container {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
  }

  /* & #profile-form-container {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 1rem;
  } */

  & #spacer {
    flex: 1 1 0;
  }
`;

export default StyledProfileEdit;
