import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ChatButton from './Buttons/ChatButton';
import UnfriendButton from './Buttons/UnfriendButton';
import ProfileLink from '../Profile/Link';

function Friendship({ className, friendship, user, chat, active }) {
  return (
    <ProfileLink className={className} user={user} active={active}>
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

  flex: 1 1 0;
  border: 1px solid black;

  background-color: var(--bg-color);
  & > div#buttons {
    visibility: hidden;
  }

  /* padding: 5rem 3rem 1rem; */
  transition: padding 1s ease-outf 0s;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--active-bg-color);
      padding: 3rem 0;

      & > div#buttons {
        visibility: visible;
      }
    `}

  font-size: 2rem;
`;

export default StyledFriendship;
