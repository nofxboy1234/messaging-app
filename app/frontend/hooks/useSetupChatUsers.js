import { useCallback, useEffect, useReducer } from 'react';
import subscribe from '../channels/subscriptions';
import chatUsersReducer from '../reducers/chatUsersReducer';
import usePreviousValues from './usePreviousValues';
import logChangedValues from '../helpers/logChangedValues';

function useSetupChatUsers(initialUsers, chatId) {
  const [users, dispatch] = useReducer(chatUsersReducer, initialUsers);

  const addUser = (user) => {
    dispatch({ type: 'added_user', user: user });
  };

  const reinitializeUsers = useCallback(() => {
    dispatch({ type: 'reinitialized_users', users: initialUsers });
  }, [initialUsers]);

  const subscribeToUserChannel = useCallback(() => {
    const userChannelSubscriptionInfo = [
      'ChatUserChannel',
      { id: chatId },
      addUser,
    ];
    const userChannel = subscribe(...userChannelSubscriptionInfo);

    return userChannel;
  }, [chatId]);

  useEffect(() => {
    reinitializeUsers();
    const userChannel = subscribeToUserChannel();

    return () => {
      userChannel.unsubscribe();
    };
  }, [reinitializeUsers, subscribeToUserChannel]);

  // const prevValues = usePreviousValues({
  //   initialUsers,
  //   chatId,
  //   reinitializeUsers,
  //   subscribeToUserChannel,
  // });
  // logChangedValues(...prevValues);

  return users;
}

export default useSetupChatUsers;
