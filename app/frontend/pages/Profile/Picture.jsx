import PropTypes from 'prop-types';
import styled from 'styled-components';

function ProfilePicture({ className, src }) {
  return (
    <img
      src={src}
      alt="Profile picture"
      className={className}
      width={'40px'}
      height={'40px'}
    />
  );
}

ProfilePicture.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
};

const StyledProfilePicture = styled(ProfilePicture)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default StyledProfilePicture;
