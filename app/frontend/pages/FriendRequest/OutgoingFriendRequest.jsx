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
  &:hover {
    cursor: pointer;
    background-color: var(--bg-color-hover);
  }
`;

OutgoingFriendRequest.propTypes = {
  className: PropTypes.string,
  friendRequest: PropTypes.object,
};

export default StyledOutgoingFriendRequest;
