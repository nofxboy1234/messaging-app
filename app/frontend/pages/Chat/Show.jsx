import Chat from './Chat';
import MessageBox from './MessageBox';
import PropTypes from 'prop-types';

function ChatShow({ chat }) {
  console.log('render Chat/Show');
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
