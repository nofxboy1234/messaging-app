import styled from 'styled-components';
import PropTypes from 'prop-types';
import CancelFriendRequestButton from './Buttons/CancelFriendRequestButton';
import ProfileLink from '../Profile/Link';

function OutgoingFriendRequest({ className, friendRequest }) {
  return (
    <ProfileLink className={className} user={friendRequest.friend}>
      <div>
        <CancelFriendRequestButton friendRequest={friendRequest} />
      </div>
    </ProfileLink>
  );
}

const StyledOutgoingFriendRequest = styled(OutgoingFriendRequest)`
  display: flex;
  justify-content: space-between;
  background-color: #3ca7ff;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.3rem;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

OutgoingFriendRequest.propTypes = {
  className: PropTypes.string,
  friendRequest: PropTypes.object,
};

export default StyledOutgoingFriendRequest;
