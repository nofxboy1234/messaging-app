import styled from 'styled-components';
import ProfilePicture from '../Profile/Picture';
import UserLink from './Link';
import PropTypes from 'prop-types';

function User({ className, user }) {
  return (
    <div className={className}>
      <ProfilePicture src={user.profile.picture} />
      <UserLink user={user} />
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object,
};

const StyledUser = styled(User)`
  background-color: #5fffaf;
  border: 1px solid black;
  padding: 0.5rem;
`;

export default StyledUser;
