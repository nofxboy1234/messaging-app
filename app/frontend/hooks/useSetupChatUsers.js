import { useCallback, useEffect, useReducer } from 'react';
import subscribe from '../channels/subscriptions';
import chatUsersReducer from '../reducers/chatUsersReducer';

function useSetupChatUsers(initialUsers, chatId) {
  const [users, dispatch] = useReducer(chatUsersReducer, initialUsers);

  const addUser = (user) => {
    dispatch({ type: 'added_user', user: user });
  };

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
    const userChannel = subscribeToUserChannel();

    return () => {
      userChannel.unsubscribe();
    };
  }, [subscribeToUserChannel]);

  return users;
}

export default useSetupChatUsers;
