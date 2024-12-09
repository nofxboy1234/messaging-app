import styled from 'styled-components';
import PropTypes from 'prop-types';
import User from '../User/User';
import CancelFriendRequestButton from './Buttons/CancelFriendRequestButton';

function OutgoingFriendRequest({ className, friendRequest }) {
  return (
    <div className={className}>
      <User user={friendRequest.friend} />
      <div>
        <CancelFriendRequestButton friendRequest={friendRequest} />
      </div>
    </div>
  );
}

const StyledOutgoingFriendRequest = styled(OutgoingFriendRequest)`
  display: flex;
  justify-content: space-between;
`;

OutgoingFriendRequest.propTypes = {
  className: PropTypes.string,
  friendRequest: PropTypes.object,
};

export default StyledOutgoingFriendRequest;
