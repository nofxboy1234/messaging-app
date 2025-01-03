import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import User from '../User/User';

function ProfileLink({ user }) {
  return <User user={user} targetPath={api.profiles.show.path(user.profile)} />;
}

ProfileLink.propTypes = {
  user: PropTypes.object,
};

const StyledProfileLink = styled(ProfileLink)`
  border: 1px solid black;
  background-color: #ffe46c;
  border-radius: 5px;
  margin: 0.5rem;
  padding: 0.3rem;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

export default StyledProfileLink;
