import PropTypes from 'prop-types';
import Picture from '../Profile/Picture';
import styled from 'styled-components';
import { forwardRef } from 'react';

const Message = forwardRef(function Message(props, ref) {
  const { className, message } = props;

  return (
    <div className={className} ref={ref}>
      <div id="user">
        <Picture src={message.user.profile.picture} />
        <div id="user-container">
          <div id="username">{message.user.profile.username}</div>
          <div id="message">{message.body}</div>
        </div>
      </div>
    </div>
  );
});

Message.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object,
};

const StyledMessage = styled(Message)`
  padding: 0.5rem;
  border: 1px solid var(--border-color);

  &:hover {
    background-color: var(--bg-color-hover);
  }

  & #user {
    display: flex;
    gap: 1rem;
  }

  & #user-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  & #username {
    font-weight: 600;
  }

  & #message {
    max-width: 600px;
    overflow: hidden;
    overflow-wrap: break-word;
  }
`;

export default StyledMessage;
