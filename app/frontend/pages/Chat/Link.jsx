import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserLink from '../User/Link';
import ProfilePicture from '../Profile/Picture';

function ChatLink({ className, children, chat, friend }) {
  return (
    <UserLink className={className} targetPath={api.chats.show.path(chat)}>
      <div id="profile-info-container">
        <ProfilePicture src={friend.profile.picture} />
        <div>{friend.profile.username}</div>
      </div>
      {children}
    </UserLink>
  );
}

ChatLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
  chat: PropTypes.object,
  friend: PropTypes.object,
};

const StyledChatLink = styled(ChatLink)`
  border-bottom: 1px solid var(--border-color);

  &:hover {
    background-color: var(--bg-color-hover);
  }

  & #profile-info-container {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

export default StyledChatLink;
