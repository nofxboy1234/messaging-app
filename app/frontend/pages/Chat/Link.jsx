import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserLink from '../User/Link';
import ProfilePicture from '../Profile/Picture';

function ChatLink({ className, chat, friend }) {
  return (
    <UserLink className={className} targetPath={api.chats.show.path(chat)}>
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
  --mimi-pink: #eccbd9;
  --alice-blue: #e1eff6;
  --light-sky-blue: #97d2fb;
  --jordy-blue: #83bcff;
  --aquamarine: #80ffe8;

  background-color: var(--mimi-pink);
`;

export default StyledChatLink;
