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
  background-color: var(--heliotrope);
  border: 1px solid var(--medium-grey);

  &:hover {
    background-color: white;
    border: 1px solid var(--medium-grey);
  }
`;

export default StyledChatLink;
