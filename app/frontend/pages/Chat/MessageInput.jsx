import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MessageInput = forwardRef(function MessageInput(
  { className, message, onChange },
  ref,
) {
  return (
    <input
      className={className}
      autoFocus
      ref={ref}
      type="text"
      id="message"
      value={message}
      onChange={onChange}
    />
  );
});

MessageInput.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onChange: PropTypes.func,
};

const StyledMessageInput = styled(MessageInput)`
  flex: 1 1 0;

  font-family: 'JetbrainsMono', monospace;
  font-size: 1rem;

  border: 1px solid #e4e4e4;
  color: var(--medium-grey);

  padding: 0.5rem 0.8rem;
  min-width: 0px;
`;

export default StyledMessageInput;
