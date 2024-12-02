import styled from 'styled-components';
import ChatLink from './Link';

function Index({ className, initialChats }) {
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

const StyledIndex = styled(Index)`
  padding: 1rem;
`;

export default StyledIndex;
