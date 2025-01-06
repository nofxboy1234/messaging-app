import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

const StyledProfileLink = styled(ProfileLink)`
  /* border: 1px solid black;
  background-color: #ffe46c;
  border-radius: 5px;
  margin: 0.5rem;
  padding: 0.3rem;
  &:hover {
    background-color: white;
    cursor: pointer;
  } */
`;

export default StyledProfileLink;
