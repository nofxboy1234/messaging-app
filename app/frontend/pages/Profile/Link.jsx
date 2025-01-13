import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import UserLink from '../User/Link';
import ProfilePicture from './Picture';

function ProfileLink({ children, user }) {
  return (
    <UserLink targetPath={api.profiles.show.path(user.profile)}>
      <ProfilePicture src={user.profile.picture} />
      <div>{user.profile.username}</div>
      {children}
    </UserLink>
  );
}

ProfileLink.propTypes = {
  children: PropTypes.object,
  user: PropTypes.object,
};

export default ProfileLink;
