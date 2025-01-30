import PropTypes from 'prop-types';
import styled from 'styled-components';

function ProfilePicture({ className, src, scale = 1 }) {
  return (
    <img
      src={src}
      alt="Profile picture"
      className={className}
      width={`${40 * scale}px`}
      height={`${40 * scale}px`}
    />
  );
}

ProfilePicture.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  scale: PropTypes.number,
};

const StyledProfilePicture = styled(ProfilePicture)`
  width: calc(40 * ${(props) => props.scale || 1}) px;
  height: calc(40 * ${(props) => props.scale || 1}) px;
  border-radius: 50%;
`;

export default StyledProfilePicture;
