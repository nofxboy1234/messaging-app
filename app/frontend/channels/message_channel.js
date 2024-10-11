console.log('*** message_channel.js');

import consumer from './consumer';

const messageChannel = consumer.subscriptions.create('MessageChannel', {
  connected() {
    console.log('*** frontend message channel connected');
  },

  disconnected() {
    console.log('*** frontend message channel disconnected');
  },

  received(data) {
    console.log('*** frontend message channel received');
  },
});

export { consumer, messageChannel };
