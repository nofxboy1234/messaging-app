import PropTypes from 'prop-types';
import styled from 'styled-components';
import EditProfileButton from './Buttons/EditProfileButton';
import UpdateAvatarLink from './Buttons/UpdateAvatarLink';

function ProfileActions({ className, profile }) {
  return (
    <div className={className}>
      <EditProfileButton profile={profile} />
      <UpdateAvatarLink />
    </div>
  );
}

ProfileActions.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
};

const StyledProfileActions = styled(ProfileActions)`
  flex: 1 1 0;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export default StyledProfileActions;
