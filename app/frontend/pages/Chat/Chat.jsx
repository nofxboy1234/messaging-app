import { useEffect, useRef, useState } from 'react';
import consumer from '../../channels/consumer';
import Message from '../Message/Message';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Chat({ className, chat }) {
  const [messages, setMessages] = useState(chat.messages);
  const [scrollBarAtBottom, setScrollBarAtBottom] = useState(false);
  const lastMessageRef = useRef(null);
  const rootElementRef = useRef(null);

  function handleScroll() {
    const rootElement = rootElementRef.current;

    const atBottom =
      rootElement.scrollHeight - rootElement.scrollTop ===
      rootElement.clientHeight;

    setScrollBarAtBottom(atBottom);
  }

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
    console.log('scroll effect 1');

    lastMessageRef.current.scrollIntoView();
  }, []);

  useEffect(() => {
    console.log('scroll effect 2');

    if (scrollBarAtBottom) {
      lastMessageRef.current.scrollIntoView();
    }
  });

  return (
    <div ref={rootElementRef} onScroll={handleScroll} className={className}>
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
