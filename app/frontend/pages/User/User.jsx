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
  border-radius: 5px;
  padding: 0.3rem;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

export default StyledUser;
