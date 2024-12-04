import PropTypes from 'prop-types';

function ProfilePicture({ src }) {
  console.log('render Profile/Picture');

  return <img src={src} alt="Profile picture" />;
}

ProfilePicture.propTypes = {
  src: PropTypes.string,
};

export default ProfilePicture;
