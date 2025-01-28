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
          <div>{message.body}</div>
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

  &:hover {
    background-color: var(--bright-pink-crayola);
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
`;

export default StyledMessage;
