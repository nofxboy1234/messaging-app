import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ChatButton from './Buttons/ChatButton';
import UnfriendButton from './Buttons/UnfriendButton';
import ProfileLink from '../Profile/Link';

function Friendship({ className, friendship, user, chat }) {
  const handleClick = (event) => {
    event.preventDefault();
    console.log('clicked UserLink');
    // If active, router.get
  };

  return (
    <ProfileLink className={className} user={user} handleClick={handleClick}>
      <div id="buttons">
        <ChatButton chat={chat} />
        <UnfriendButton friendship={friendship} user={user} />
      </div>
    </ProfileLink>
  );
}

const StyledFriendship = styled(Friendship)`
  --bg-color: #5fffaf;
  --active-bg-color: white;

  background-color: var(--bg-color);

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--active-bg-color);
    `}

  padding: 5rem 3rem 1rem;
  font-size: 2rem;
`;

Friendship.propTypes = {
  className: PropTypes.string,
  friendship: PropTypes.object,
  user: PropTypes.object,
  chat: PropTypes.object,
};

export default StyledFriendship;
