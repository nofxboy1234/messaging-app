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
  --heliotrope: #ca7df9;
  --vivid-sky-blue: #49c6e5;
  --icterine: #f5f749;
  --timberwolf: #dbd4d3;
  --bright-pink-crayola: #ff5d73;

  background-color: var(--icterine);
`;

export default StyledProfileLink;
