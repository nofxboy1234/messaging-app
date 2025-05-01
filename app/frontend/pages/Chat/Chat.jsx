import { useEffect, useRef, useState } from 'react';
import consumer from '../../channels/consumer';
import Message from '../Message/Message';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Chat({ className, chat }) {
  const [messages, setMessages] = useState(chat.messages);
  let scrollBarWasAtBottomRef = useRef(true);
  const lastMessageRef = useRef(null);
  const rootElementRef = useRef(null);

  function isScrollBarAtBottom() {
    const rootElement = rootElementRef.current;

    return (
      Math.abs(
        rootElement.scrollHeight -
          rootElement.scrollTop -
          rootElement.clientHeight,
      ) <= 10
    );
  }

  function handleScroll() {
    scrollBarWasAtBottomRef.current = isScrollBarAtBottom();
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
    if (!lastMessageRef.current || !rootElementRef.current) {
      return;
    }

    if (scrollBarWasAtBottomRef.current) {
      requestAnimationFrame(() => {
        console.log('*** scroll into view ***');
        lastMessageRef.current.scrollIntoView({
          behavior: 'instant',
          block: 'end',
          inline: 'end',
        });
      });
    }
  }, [messages.length]);

  return (
    <div
      data-testid="root"
      ref={rootElementRef}
      onScroll={handleScroll}
      className={className}
    >
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

  overflow-x: hidden;
  overflow-y: auto;
`;

export default StyledChat;
