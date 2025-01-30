import PropTypes from 'prop-types';
import styled from 'styled-components';

function ProfilePicture({ className, src, scale }) {
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

const StyledProfilePicture = styled(ProfilePicture).attrs((props) => ({
  scale: props.scale || 1,
}))`
  width: calc(40 * ${(props) => props.scale}) px;
  height: calc(40 * ${(props) => props.scale}) px;
  border-radius: 50%;
`;

export default StyledProfilePicture;
