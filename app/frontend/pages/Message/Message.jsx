import PropTypes from 'prop-types';
import Picture from '../Profile/Picture';
import styled from 'styled-components';
import { forwardRef } from 'react';

const Message = forwardRef(function Message(props, ref) {
  const { className, message } = props;

  return (
    <div className={className} ref={ref}>
      <Picture src={message.user.profile.picture} />
      <div>{message.user.profile.username}</div>
      <div>{message.body}</div>
    </div>
  );
});

const StyledMessage = styled(Message)`
  border: 1px solid black;

  &:hover {
    background-color: var(--bright-pink-crayola);
  }
`;

Message.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object,
};

export default StyledMessage;
