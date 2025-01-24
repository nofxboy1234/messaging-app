import { useEffect, useRef, useState } from 'react';
import consumer from '../../channels/consumer';
import Message from '../Message/Message';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Chat({ className, chat }) {
  const [messages, setMessages] = useState(chat.messages);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      { channel: 'MessageChannel', id: chat.id },
      {
        connected() {},

        disconnected() {},

        received(message) {
          setMessages((messages) => [...messages, message]);
        },
      },
    );

    return () => {
      channel.unsubscribe();
    };
  }, [chat.id]);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView();
  });

  return (
    <div className={className}>
      <div>
        {messages.map((message, index) => {
          return (
            <Message
              key={message.id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              message={message}
            />
          );
        })}
      </div>
    </div>
  );
}

Chat.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object,
};

const StyledChat = styled(Chat)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export default StyledChat;
