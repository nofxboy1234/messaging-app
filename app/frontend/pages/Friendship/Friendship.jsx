import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ChatButton from './Buttons/ChatButton';
import UnfriendButton from './Buttons/UnfriendButton';
import ProfileLink from '../Profile/Link';

function Friendship({
  className,
  friendship,
  user,
  chat,
  active,
  handleClick,
}) {
  return (
    <div id="friendship" onClick={handleClick}>
      <ProfileLink
        className={className}
        user={user}
        active={active}
        // $activePadding={true}
      >
        <div id="buttons">
          <ChatButton chat={chat} />
          <UnfriendButton friendship={friendship} user={user} />
        </div>
      </ProfileLink>
    </div>
  );
}

Friendship.propTypes = {
  className: PropTypes.string,
  friendship: PropTypes.object,
  user: PropTypes.object,
  chat: PropTypes.object,
  active: PropTypes.bool,
  handleClick: PropTypes.func,
};

const StyledFriendship = styled(Friendship)`
  --bg-color: white;
  --active-bg-color: #e9405f;
  --active-fg-color: white;

  font-size: 2rem;
  border: 1px solid black;

  background-color: var(--bg-color);
  & div#buttons {
    visibility: hidden;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: var(--active-bg-color);
      color: var(--active-fg-color);

      & div#buttons {
        visibility: visible;
      }

      & .link {
        pointer-events: auto;
        ${() => 'padding: 3rem 0'}
      }
    `}

  &:hover {
    cursor: pointer;
    background-color: var(--active-bg-color);
    color: var(--active-fg-color);
  }
`;

export default StyledFriendship;
