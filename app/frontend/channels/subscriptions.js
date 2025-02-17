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

function allUserChannel(receivedCallback) {
  return subscribe('AllUserChannel', {}, receivedCallback);
}

function chatUserChannel(params, receivedCallback) {
  return subscribe('ChatUserChannel', params, receivedCallback);
}

export default subscribe;
export { allUserChannel, chatUserChannel };
