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
  --heliotrope: #ca7df9;
  --ucla-blue: #2374ab;
  --icterine: #f5f749;
  --timberwolf: #dbd4d3;
  --bright-pink-crayola: #ff5d73;

  background-color: var(--heliotrope);
  border: 1px solid black;

  &:hover {
    background-color: white;
    border: 1px solid black;
  }
`;

export default StyledChatLink;
