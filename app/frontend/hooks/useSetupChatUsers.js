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

    return userChannel;
  }, [chatId]);

  useEffect(() => {
    reinitializeUsers();
    const userChannel = subscribeToUserChannel();

    return () => {
      userChannel.unsubscribe();
    };
  }, [reinitializeUsers, subscribeToUserChannel]);

  return users;
}

export default useSetupChatUsers;
