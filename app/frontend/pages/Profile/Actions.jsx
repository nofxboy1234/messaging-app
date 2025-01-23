import PropTypes from 'prop-types';
import styled from 'styled-components';
import EditProfileButton from './Buttons/EditProfileButton';

function ProfileActions({ className, profile }) {
  return (
    <div className={className}>
      <EditProfileButton profile={profile} />
      <div>
        <a
          href="https://gravatar.com/connect/?gravatar_from=signup"
          target="_blank"
        >
          Update avatar
        </a>
      </div>
    </div>
  );
}

ProfileActions.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
};

const StyledProfileActions = styled(ProfileActions)`
  border: 1px solid black;
  background-color: #6cfaff;
  padding: 0.5rem;
`;

export default StyledProfileActions;
