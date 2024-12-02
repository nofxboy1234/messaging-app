import Message from '../Message/Message';
import styled from 'styled-components';

const MessageDisplay = ({ className, messages }) => {
  return (
    
  );
};

const StyledMessageDisplay = styled(MessageDisplay)`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  height: 300px;
  border: 1px solid black;
`;

export default StyledMessageDisplay;
