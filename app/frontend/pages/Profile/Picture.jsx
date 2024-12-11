import PropTypes from 'prop-types';

function ProfilePicture({ src }) {
  return <img src={src} alt="Profile picture" width={45} />;
}

ProfilePicture.propTypes = {
  src: PropTypes.string,
};

export default ProfilePicture;
