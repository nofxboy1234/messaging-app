import PropTypes from 'prop-types';
import styled from 'styled-components';

function ChatTotal({ className, chats }) {
  return <div className={className}>CHATS-{chats.length}</div>;
}

ChatTotal.propTypes = {
  className: PropTypes.string,
  chats: PropTypes.array,
};

const StyledChatTotal = styled(ChatTotal)`
  border-bottom: 1px solid var(--border-color);
`;

export default StyledChatTotal;
