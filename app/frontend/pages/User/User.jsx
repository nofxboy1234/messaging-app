import styled from 'styled-components';
import ProfilePicture from '../Profile/Picture';
import UserLink from './Link';
import PropTypes from 'prop-types';

function User({ className, user, targetPath }) {
  return (
    <div className={className}>
      <ProfilePicture src={user.profile.picture} />
      <UserLink user={user} targetPath={targetPath} />
    </div>
  );
}

User.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  targetPath: PropTypes.string,
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
