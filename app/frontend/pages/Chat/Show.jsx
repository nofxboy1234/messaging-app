import Chat from './Chat';
import MessageBox from './MessageBox';
import PropTypes from 'prop-types';

function ChatShow({ chat }) {
  return (
    <div>
      <Chat chat={chat} />
      <MessageBox chat={chat} />
    </div>
  );
}

ChatShow.propTypes = {
  chat: PropTypes.object,
};

export default ChatShow;
