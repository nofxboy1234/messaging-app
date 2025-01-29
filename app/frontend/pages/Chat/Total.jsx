import PropTypes from 'prop-types';

function ChatTotal({ chats }) {
  return <div>CHATS-{chats.length}</div>;
}

ChatTotal.propTypes = {
  chats: PropTypes.array,
};

export default ChatTotal;
