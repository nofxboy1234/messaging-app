import styled from 'styled-components';
import Chat from './Chat';
import MessageBox from './MessageBox';
import PropTypes from 'prop-types';

function ChatShow({ className, chat }) {
  return (
    <div className={className}>
      <Chat chat={chat} />
      <MessageBox chat={chat} />
    </div>
  );
}

ChatShow.propTypes = {
  chat: PropTypes.object,
};

const StyledChatShow = styled(ChatShow)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 19px);
`;

export default StyledChatShow;
