import { useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';
import Message from '../Message/Message';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Chat({ className, chat }) {
  const [messages, setMessages] = useState(chat.messages);

  useEffect(() => {
    const consumer = createConsumer();
    const channel = consumer.subscriptions.create(
      { channel: 'ChatChannel', id: chat.id },
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
      consumer.disconnect();
    };
  }, [chat.id]);

  return (
    <div className={className}>
      <div>
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
    </div>
  );
}

Chat.propTypes = {
  chat: PropTypes.object,
};

const StyledChat = styled(Chat)`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  height: 300px;
  border: 1px solid black;
`;

export default StyledChat;
