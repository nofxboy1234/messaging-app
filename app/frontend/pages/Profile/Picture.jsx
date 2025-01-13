import PropTypes from 'prop-types';
import styled from 'styled-components';

function ProfilePicture({ className, src }) {
  return (
    <img
      src={src}
      alt="Profile picture"
      className={className}
      width={'32px'}
      height={'auto'}
    />
  );
}

ProfilePicture.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
};

const StyledProfilePicture = styled(ProfilePicture)`
  width: 32px;
  height: auto;
  border-radius: 50%;
`;

export default StyledProfilePicture;
