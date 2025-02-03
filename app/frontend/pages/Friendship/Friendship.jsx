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
      <ProfileLink className={className} user={user} active={active}>
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

  & div#buttons {
    display: none;
  }

  & .link {
    pointer-events: none;
    transition: padding 0.1s ease-out 0s;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: #ebebeb;

      & div#buttons {
        display: flex;
        gap: 1rem;
      }

      & .link {
        pointer-events: auto;
        padding: 1rem 1rem;
      }
    `}

  &:hover {
    cursor: pointer;
    background-color: var(--bg-color-hover);
  }
`;

export default StyledFriendship;
