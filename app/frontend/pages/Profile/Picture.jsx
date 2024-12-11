import PropTypes from 'prop-types';
import styled from 'styled-components';

function ProfilePicture({ className, src }) {
  return <img src={src} alt="Profile picture" className={className} />;
}

ProfilePicture.propTypes = {
  src: PropTypes.string,
};

const StyledProfilePicture = styled(ProfilePicture)`
  width: 42px;
  border-radius: 50%;
`;

export default StyledProfilePicture;
