import Picture from './Picture';
import PropTypes from 'prop-types';

function Profile({ profile }) {
  return (
    <div>
      <Picture src={profile.picture} />
      <div>
        <a
          href="https://gravatar.com/connect/?gravatar_from=signup"
          target="_blank"
        >
          Update avatar
        </a>
      </div>
      <div>{profile.username}</div>
      <div>{profile.about}</div>
    </div>
  );
}

Profile.propTypes = {
  profile: PropTypes.object,
};

export default Profile;
