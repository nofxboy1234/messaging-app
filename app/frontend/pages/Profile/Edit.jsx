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
            form.transform((data) => ({ profile: data }));
            form.patch(api.profiles.update.path(profile));
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
  margin: 1rem;

  & #profile-container {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
  }

  & #spacer {
    flex: 1 1 0;
  }
`;

export default StyledProfileEdit;
