import PropTypes from 'prop-types';
import Picture from '../Profile/Picture';
import { memo } from 'react';

const Message = memo(function Message({ message }) {
  return (
    <div>
      <Picture src={message.user.profile.picture} />
      <div>{message.user.profile.username}</div>
      <div>{message.body}</div>
    </div>
  );
});

Message.propTypes = {
  message: PropTypes.object,
};

export default Message;
