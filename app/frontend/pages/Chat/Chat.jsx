import { useEffect, useRef, useState } from 'react';
import consumer from '../../channels/consumer';
import Message from '../Message/Message';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Chat({ className, chat }) {
  const [messages, setMessages] = useState(chat.messages);
  const [scrollBarWasAtBottom, setScrollBarWasAtBottom] = useState(true);
  const lastMessageRef = useRef(null);
  const rootElementRef = useRef(null);

  function handleScroll() {
    console.log('handle scroll');

    const rootElement = rootElementRef.current;

    const atBottom =
      rootElement.scrollHeight - rootElement.scrollTop ===
      rootElement.clientHeight;

    setScrollBarWasAtBottom(atBottom);
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
    if (scrollBarWasAtBottom) {
      console.log('scroll into view');
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
