import styled from 'styled-components';
import PropTypes from 'prop-types';
import AcceptFriendRequestButton from './Buttons/AcceptFriendRequestButton';
import RejectFriendRequestButton from './Buttons/RejectFriendRequestButton';
import ProfileLink from '../Profile/Link';

function IncomingFriendRequest({ className, friendRequest }) {
  return (
    <ProfileLink className={className} user={friendRequest.user}>
      <div>
        <AcceptFriendRequestButton friendRequest={friendRequest} />
        <RejectFriendRequestButton friendRequest={friendRequest} />
      </div>
    </ProfileLink>
  );
}

const StyledIncomingFriendRequest = styled(IncomingFriendRequest)`
  display: flex;
  justify-content: space-between;
  background-color: #fff383;
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
