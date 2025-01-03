import PropTypes from 'prop-types';
import Picture from '../Profile/Picture';
import styled from 'styled-components';

function Message({ className, message }) {
  return (
    <div className={className}>
      <Picture src={message.user.profile.picture} />
      <div>{message.user.profile.username}</div>
      <div>{message.body}</div>
    </div>
  );
}

const StyledMessage = styled(Message)`
  border: 1px solid black;
  background-color: #9e63fd;
  border-radius: 5px;
  margin: 0.5rem;
  &:hover {
    background-color: white;
  }
`;

Message.propTypes = {
  message: PropTypes.object,
};

export default StyledMessage;
