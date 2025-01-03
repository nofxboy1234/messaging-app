import styled from 'styled-components';
import PropTypes from 'prop-types';
import User from '../User/User';
import AcceptFriendRequestButton from './Buttons/AcceptFriendRequestButton';
import RejectFriendRequestButton from './Buttons/RejectFriendRequestButton';

function IncomingFriendRequest({ className, friendRequest }) {
  return (
    <div className={className}>
      <User user={friendRequest.user} />
      <div>
        <AcceptFriendRequestButton friendRequest={friendRequest} />
        <RejectFriendRequestButton friendRequest={friendRequest} />
      </div>
    </div>
  );
}

const StyledIncomingFriendRequest = styled(IncomingFriendRequest)`
  display: flex;
  justify-content: space-between;
  background-color: rgb(110, 255, 97);
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.3rem;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

IncomingFriendRequest.propTypes = {
  className: PropTypes.string,
  friendRequest: PropTypes.object,
};

export default StyledIncomingFriendRequest;
