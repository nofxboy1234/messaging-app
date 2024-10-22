import Message from '../Message/Message';
import styled from 'styled-components';

const MessageDisplay = ({ className, messages }) => {
  return (
    <div className={className}>
      <div>
        {messages.map((message, index) => {
          return <Message key={message.id || index} message={message} />;
        })}
      </div>
    </div>
  );
};

const StyledMessageDisplay = styled(MessageDisplay)`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  height: 300px;
  border: 1px solid black;

  #hello {
    background-color: red;
  }
`;

export default StyledMessageDisplay;
