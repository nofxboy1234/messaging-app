import { useCallback, useEffect, useReducer } from 'react';
import logChangedValues from '../helpers/logChangedValues';
import usePreviousValues from './usePreviousValues';
import subscribe from '../channels/subscriptions';
import usersReducer from '../reducers/usersReducer';

function useSetupChatUsers(activeChat) {
  const [users, dispatch] = useReducer(usersReducer, activeChat.members);

  const addUser = (user) => {
    dispatch({ type: 'added_user', user: user });
  };

  const reinitializeUsers = useCallback(() => {
    dispatch({ type: 'reinitialized_users', users: activeChat.members });
  }, [activeChat.members]);

  const subscribeToUserChannel = useCallback(() => {
    let userChannel;
    const userChannelSubscriptionInfo = [
      'ChatUserChannel',
      { id: activeChat.id },
      addUser,
    ];
    userChannel = subscribe(...userChannelSubscriptionInfo);
    console.log('subscribed: ', userChannel.identifier);

    return userChannel;
  }, [activeChat.id]);

  useEffect(() => {
    console.log('~*~*~*');

    reinitializeUsers();
    const userChannel = subscribeToUserChannel();

    return () => {
      console.log('------');
      userChannel.unsubscribe();
      console.log('unsubscribed: ', userChannel.identifier);
    };
  }, [reinitializeUsers, subscribeToUserChannel]);

  const prevValues = usePreviousValues({
    'activeChat.id': activeChat.id,
    'activeChat.members': activeChat.members,
  });
  logChangedValues(...prevValues);

  return users;
}

export default useSetupChatUsers;
