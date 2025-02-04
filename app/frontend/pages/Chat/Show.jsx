import styled from 'styled-components';
import Chat from './Chat';
import MessageBox from './MessageBox';
import PropTypes from 'prop-types';
import HeaderProfileLink from './HeaderProfileLink';

function ChatShow({ className, chat, chattingWith }) {
  return (
    <div className={className}>
      <HeaderProfileLink user={chattingWith} />
      <Chat chat={chat} />
      <MessageBox chat={chat} />
    </div>
  );
}

ChatShow.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object,
  chattingWith: PropTypes.object,
};

const StyledChatShow = styled(ChatShow)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;
`;

export default StyledChatShow;
