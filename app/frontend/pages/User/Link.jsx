import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import ProfilePicture from '../Profile/Picture';
import styled from 'styled-components';

function UserLink({ className, user, targetPath }) {
  return (
    <Link className={className} href={targetPath}>
      <ProfilePicture src={user.profile.picture} />
      <div>{user.profile.username}</div>
    </Link>
  );
}

UserLink.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  targetPath: PropTypes.string,
};

const StyledUserLink = styled(UserLink)`
  display: block;
  background-color: #5fffaf;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.3rem;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

export default StyledUserLink;
