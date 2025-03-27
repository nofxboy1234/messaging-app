import { useCallback, useEffect, useReducer } from 'react';
import logChangedValues from '../helpers/logChangedValues';
import usePreviousValues from './usePreviousValues';
import subscribe from '../channels/subscriptions';
import chatUsersReducer from '../reducers/chatUsersReducer';

function useSetupChatUsers(initialUsers, chatId) {
  const [users, dispatch] = useReducer(chatUsersReducer, initialUsers);

  const addUser = (user) => {
    dispatch({ type: 'added_user', user: user });
  };

  const reinitializeUsers = useCallback(() => {
    dispatch({ type: 'reinitialized_users', users: initialUsers });
  }, [initialUsers]);

  const subscribeToUserChannel = useCallback(() => {
    let userChannel;
    const userChannelSubscriptionInfo = [
      'ChatUserChannel',
      { id: chatId },
      addUser,
    ];
    userChannel = subscribe(...userChannelSubscriptionInfo);
    console.log('subscribed: ', userChannel.identifier);

    return userChannel;
  }, [chatId]);

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
    initialUsers,
    chatId,
  });
  logChangedValues(...prevValues);

  return users;
}

export default useSetupChatUsers;
