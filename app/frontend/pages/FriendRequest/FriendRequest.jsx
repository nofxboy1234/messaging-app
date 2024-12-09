import styled from 'styled-components';
import Direction from './Direction';
import PropTypes from 'prop-types';
import User from '../User/User';
import OutgoingFriendRequestActions from './OutgoingActions';
import IncomingFriendRequestActions from './IncomingActions';

function FriendRequest({ className, pendingFriend, direction }) {
  return (
    <div className={className}>
      <User user={pendingFriend} />
      {direction === Direction.OUTGOING ? (
        <OutgoingFriendRequestActions user={pendingFriend} />
      ) : (
        <IncomingFriendRequestActions user={pendingFriend} />
      )}
    </div>
  );
}

const StyledFriendRequest = styled(FriendRequest)`
  display: flex;
  justify-content: space-between;
`;

FriendRequest.propTypes = {
  className: PropTypes.string,
  pendingFriend: PropTypes.object,
  direction: PropTypes.string,
};

export default StyledFriendRequest;
