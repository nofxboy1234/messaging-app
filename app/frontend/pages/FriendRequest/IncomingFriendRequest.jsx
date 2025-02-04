import styled from 'styled-components';
import PropTypes from 'prop-types';
import AcceptFriendRequestButton from './Buttons/AcceptFriendRequestButton';
import RejectFriendRequestButton from './Buttons/RejectFriendRequestButton';
import ProfileLink from '../Profile/Link';

function IncomingFriendRequest({ className, friendRequest }) {
  return (
    <ProfileLink className={className} user={friendRequest.user}>
      <div id="buttons">
        <AcceptFriendRequestButton friendRequest={friendRequest} />
        <RejectFriendRequestButton friendRequest={friendRequest} />
      </div>
    </ProfileLink>
  );
}

IncomingFriendRequest.propTypes = {
  className: PropTypes.string,
  friendRequest: PropTypes.object,
};

const StyledIncomingFriendRequest = styled(IncomingFriendRequest)`
  &:hover {
    cursor: pointer;
    background-color: var(--bg-color-hover);
  }

  & #buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

export default StyledIncomingFriendRequest;
