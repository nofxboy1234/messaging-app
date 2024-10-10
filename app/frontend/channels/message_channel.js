console.log('*** message_channel.js ***');

import consumer from './consumer';

const messageChannel = consumer.subscriptions.create('MessageChannel', {
  connected() {},

  disconnected() {},

  received(data) {},
});
