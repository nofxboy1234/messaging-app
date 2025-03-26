import { useCallback, useEffect, useState } from 'react';
import logChangedValues from '../helpers/logChangedValues';
import usePreviousValues from './usePreviousValues';
import subscribe from '../channels/subscriptions';

function useSetupChatUsers(activeChat) {
  const [users, setUsers] = useState(activeChat.members);

  const appendUser = (user) => {
    setUsers((users) => [...users, user]);
  };

  const subscribeToUserChannel = useCallback(() => {
    let userChannel;
    const userChannelSubscriptionInfo = [
      'ChatUserChannel',
      { id: activeChat.id },
      appendUser,
    ];
    userChannel = subscribe(...userChannelSubscriptionInfo);
    console.log('subscribed: ', userChannel.identifier);

    return userChannel;
  }, [activeChat.id]);

  useEffect(() => {
    console.log('~*~*~*');

    setUsers(activeChat.members);
    const userChannel = subscribeToUserChannel();

    return () => {
      console.log('------');
      userChannel.unsubscribe();
      console.log('unsubscribed: ', userChannel.identifier);
    };
  }, [activeChat.members, subscribeToUserChannel]);

  const prevValues = usePreviousValues({
    'activeChat.id': activeChat.id,
    'activeChat.members': activeChat.members,
  });
  logChangedValues(...prevValues);

  return users;
}

export default useSetupChatUsers;
