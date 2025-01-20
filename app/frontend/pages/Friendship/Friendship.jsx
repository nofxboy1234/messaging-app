import styled from 'styled-components';
import PropTypes from 'prop-types';
import ChatButton from './Buttons/ChatButton';
import UnfriendButton from './Buttons/UnfriendButton';
import ProfileLink from '../Profile/Link';

function Friendship({ className, friendship, user, chat }) {
  return (
    <ProfileLink className={className} user={user}>
      <div id="buttons">
        <ChatButton chat={chat} />
        <UnfriendButton friendship={friendship} user={user} />
      </div>
    </ProfileLink>
  );
}

const StyledFriendship = styled(Friendship)`
  background-color: #5fffaf;
  padding: 5rem 3rem 1rem;
  font-size: 2rem;

  > div#buttons {
    visibility: hidden;
  }

  &:hover {
    > div#buttons {
      visibility: visible;
    }
  }
`;

Friendship.propTypes = {
  className: PropTypes.string,
  friendship: PropTypes.object,
  user: PropTypes.object,
  chat: PropTypes.object,
};

export default StyledFriendship;
