import styled from 'styled-components';
import ChatLink from './Link';
import PropTypes from 'prop-types';

function ChatIndex({ className, initialChats }) {
  return (
    <div className={className}>
      <div>
        {initialChats.map((chat) => (
          <ChatLink key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}

ChatIndex.propTypes = {
  className: PropTypes.string,
  initialChats: PropTypes.array,
};

const StyledChatIndex = styled(ChatIndex)`
  padding: 1rem;
`;

export default StyledChatIndex;
