import consumer from './consumer';

function subscribe(channelName, params, receivedCallback) {
  return consumer.subscriptions.create(
    { channel: channelName, ...params },
    {
      received(data) {
        receivedCallback(data);
      },
    },
  );
}

export default subscribe;
