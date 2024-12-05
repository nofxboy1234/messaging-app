import ProfilePicture from '../Profile/Picture';
import UserLink from './Link';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <div>
      <ProfilePicture src={user.profile.picture} />
      <UserLink user={user} />
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object,
};

export default User;
