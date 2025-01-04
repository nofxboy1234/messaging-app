import api from '../../pathHelpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserLink from '../User/Link';

function ChatLink({ chat, friend }) {
  return <UserLink user={friend} targetPath={api.chats.show.path(chat)} />;
}

ChatLink.propTypes = {
  chat: PropTypes.object,
  friend: PropTypes.object,
};

const StyledChatLink = styled(ChatLink)`
  border: 1px solid black;
  background-color: #ffe46c;
  border-radius: 5px;
  margin: 0.5rem;
  padding: 0.3rem;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

export default StyledChatLink;
