import styled from 'styled-components';
import PropTypes from 'prop-types';
import User from '../User/User';
import UserActions from '../User/Actions';
import Relationship from '../Profile/Relationship';

function IncomingFriend({ className, incomingFriend }) {
  return (
    <div className={className}>
      <User user={incomingFriend} />
      <UserActions
        user={incomingFriend}
        initialRelationship={Relationship.INCOMING_REQUEST}
      />
    </div>
  );
}

IncomingFriend.propTypes = {
  className: PropTypes.string,
  incomingFriend: PropTypes.object,
};

const StyledIncomingFriend = styled(IncomingFriend)`
  display: flex;
  justify-content: space-between;
`;

export default StyledIncomingFriend;
