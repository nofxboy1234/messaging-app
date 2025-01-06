import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserLink from '../User/Link';
import ProfilePicture from '../Profile/Picture';

function ChatLink({ className, chat, friend }) {
  return (
    <UserLink
      className={className}
      user={friend}
      targetPath={api.chats.show.path(chat)}
    >
      <ProfilePicture src={friend.profile.picture} />
      <div>{friend.profile.username}</div>
    </UserLink>
  );
}

ChatLink.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object,
  friend: PropTypes.object,
};

const StyledChatLink = styled(ChatLink)`
  display: flex;
  justify-content: space-between;

  background-color: #f9b7ff;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.3rem;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

export default StyledChatLink;
