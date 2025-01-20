import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import UserLink from '../User/Link';
import ProfilePicture from './Picture';

function ProfileLink({ className, children, user, handleClick }) {
  return (
    <UserLink
      className={className}
      targetPath={api.profiles.show.path(user.profile)}
      handleClick={handleClick}
    >
      <ProfilePicture src={user.profile.picture} />
      <div>{user.profile.username}</div>
      {children}
    </UserLink>
  );
}

ProfileLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
  user: PropTypes.object,
};

export default ProfileLink;
