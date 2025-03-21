import styled from 'styled-components';
import Chat from './Chat';
import MessageBox from './MessageBox';
import PropTypes from 'prop-types';
import HeaderProfileLink from './HeaderProfileLink';
import { useContext, useEffect } from 'react';
import { ChatContext } from '../Layout';

import usePreviousValues from './usePreviousValues';
import logChangedValues from './logChangedValues';

function ChatShow({ className, chat, chattingWith }) {
  const { setActiveChat } = useContext(ChatContext);

  const [valueNames, prevValues, curValues] = usePreviousValues({
    chat: chat,
    setActiveChat: setActiveChat,
  });

  logChangedValues(valueNames, prevValues, curValues);

  useEffect(() => {
    setActiveChat(chat);

    return () => setActiveChat(null);
  }, [chat, setActiveChat]);

  return (
    <div className={className}>
      <HeaderProfileLink user={chattingWith} />
      <Chat chat={chat} />
      <MessageBox chat={chat} />
    </div>
  );
}

ChatShow.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object,
  chattingWith: PropTypes.object,
};

const StyledChatShow = styled(ChatShow)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;
`;

export default StyledChatShow;
