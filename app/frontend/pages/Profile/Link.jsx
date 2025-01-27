import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import UserLink from '../User/Link';
import ProfilePicture from './Picture';
import styled from 'styled-components';

function ProfileLink({ className, children, user, active }) {
  return (
    <UserLink
      className={className}
      targetPath={api.profiles.show.path(user.profile)}
      $active={active}
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
  active: PropTypes.bool,
};

const StyledProfileLink = styled(ProfileLink)`
  --mimi-pink: #eccbd9;
  --alice-blue: #e1eff6;
  --light-sky-blue: #97d2fb;
  --jordy-blue: #83bcff;
  --aquamarine: #80ffe8;

  background-color: var(--light-sky-blue);
`;

export default StyledProfileLink;
