import { useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';
import Message from '../Message/Message';

export default function Chat({ chat }) {
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
    <div>
      {messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
}
