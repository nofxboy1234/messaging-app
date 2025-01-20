import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ChatButton from './Buttons/ChatButton';
import UnfriendButton from './Buttons/UnfriendButton';
import ProfileLink from '../Profile/Link';

function Friendship({ className, friendship, user, chat, active }) {
  const handleClick = (event) => {
    event.preventDefault();
    console.log('Friendship');
    // If active, router.get
  };

  return (
    <ProfileLink
      className={className}
      user={user}
      handleClick={handleClick}
      active={active}
    >
      <div id="buttons">
        <ChatButton chat={chat} />
        <UnfriendButton friendship={friendship} user={user} />
      </div>
    </ProfileLink>
  );
}

Friendship.propTypes = {
  className: PropTypes.string,
  friendship: PropTypes.object,
  user: PropTypes.object,
  chat: PropTypes.object,
};

const StyledFriendship = styled(Friendship)`
  --bg-color: #5fffaf;
  --active-bg-color: white;

  background-color: var(--bg-color);
  & > div#buttons {
    visibility: hidden;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: var(--active-bg-color);
      & > div#buttons {
        visibility: visible;
      }
    `}

  padding: 5rem 3rem 1rem;
  font-size: 2rem;
`;

export default StyledFriendship;
