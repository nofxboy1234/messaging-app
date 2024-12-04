import styled from 'styled-components';
import User from '../User/User';
import UserActions from '../User/Actions';
import Relationship from '../Profile/Relationship';
import PropTypes from 'prop-types';

function Friend({ className, friend }) {
  console.log('render Friend/Friend');

  return (
    <div className={className}>
      <User user={friend} />
      <UserActions user={friend} initialRelationship={Relationship.FRIEND} />
    </div>
  );
}

Friend.propTypes = {
  className: PropTypes.string,
  friend: PropTypes.object,
};

const StyledFriend = styled(Friend)`
  display: flex;
  justify-content: space-between;
`;

export default StyledFriend;
