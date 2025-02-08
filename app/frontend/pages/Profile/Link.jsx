import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import UserLink from '../User/Link';
import ProfilePicture from './Picture';
import styled from 'styled-components';

function ProfileLink({ className, children, user, active, scale }) {
  return (
    <UserLink
      className={className}
      targetPath={api.profiles.show.path(user.profile)}
      $active={active}
    >
      <div id="profile-info-container">
        <ProfilePicture src={user.profile.picture} scale={scale} />
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
  scale: PropTypes.number,
};

const StyledProfileLink = styled(ProfileLink)`
  border-bottom: 1px solid var(--border-color);

  &:hover {
    background-color: var(--bg-color-hover);
  }

  & #profile-info-container {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  @media (max-width: 1160px) {
    border: solid var(--border-color);
    border-width: 0 0 1px;
  }
`;

export default StyledProfileLink;
