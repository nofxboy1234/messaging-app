import styled from 'styled-components';
import Button from '../../Buttons/Button';
import PropTypes from 'prop-types';
import api from '../../../pathHelpers';
import { usePage } from '@inertiajs/react';

function SendMessageButton({ className, message, setMessage, chat, inputRef }) {
  const { shared } = usePage().props;

  function clearMessage() {
    setMessage('');
  }

  return (
    <Button
      className={className}
      text={'Send'}
      onClick={() => {
        if (message === '') return;

        const data = {
          body: message,
          chat_id: chat.id,
        };

        const options = {
          onFinish: () => {
            api.sendMessageBroadcast.create({
              data: { user_id: shared.current_user.id, chat_id: chat.id },
            });
          },
        };

        api.messages.create({ data: data, options: options });
        clearMessage();
        inputRef.current.focus();
      }}
      type="submit"
    />
  );
}

SendMessageButton.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  setMessage: PropTypes.func,
  chat: PropTypes.object,
  inputRef: PropTypes.object,
};

const StyledSendMessageButton = styled(SendMessageButton)`
  margin: 0;
`;

export default StyledSendMessageButton;
