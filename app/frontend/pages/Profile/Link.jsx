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
      <div id="profile-info-container">
        <ProfilePicture src={user.profile.picture} />
        <div>{user.profile.username}</div>
      </div>
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
  border: 1px solid var(--border-color);

  &:hover {
    background-color: var(--bg-color-hover);
  }

  & #profile-info-container {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

export default StyledProfileLink;
