import { useEffect, useState } from 'react';
import logChangedValues from '../helpers/logChangedValues';
import usePreviousValues from './usePreviousValues';
import subscribe from '../channels/subscriptions';

function useSetupChatUsers(activeChat) {
  const [users, setUsers] = useState(activeChat.members);

  useEffect(() => {
    console.log('~*~*~*');

    const appendUser = (user) => {
      setUsers((users) => [...users, user]);
    };

    setUsers(activeChat.members);

    let userChannel;
    const userChannelSubscriptionInfo = [
      'ChatUserChannel',
      { id: activeChat.id },
      appendUser,
    ];
    userChannel = subscribe(...userChannelSubscriptionInfo);
    console.log('subscribed: ', userChannel.identifier);

    return () => {
      console.log('------');
      userChannel.unsubscribe();
      console.log('unsubscribed: ', userChannel.identifier);
    };
  }, [activeChat.id, activeChat.members]);

  const prevValues = usePreviousValues({
    'activeChat.id': activeChat.id,
    'activeChat.members': activeChat.members,
  });
  logChangedValues(...prevValues);

  return users;
}

export default useSetupChatUsers;
