import api from '../../../pathHelpers';
import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';

function ChatButton({ className, chat }) {
  return (
    <Button
      className={className}
      text={'Chat'}
      onClick={() => api.chats.show({ obj: chat })}
    />
  );
}

ChatButton.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object,
};

const StyledChatButton = styled(ChatButton)``;

export default StyledChatButton;
