import { useCallback, useEffect, useReducer } from 'react';
import subscribe from '../channels/subscriptions';
import allUsersReducer from '../reducers/allUsersReducer';

function useSetupAllUsers(initialUsers) {
  const [users, dispatch] = useReducer(allUsersReducer, initialUsers);

  const addUser = (user) => {
    dispatch({ type: 'added_user', user: user });
  };

  const subscribeToUserChannel = useCallback(() => {
    const userChannelSubscriptionInfo = ['AllUserChannel', {}, addUser];
    const userChannel = subscribe(...userChannelSubscriptionInfo);

    return userChannel;
  }, []);

  useEffect(() => {
    const userChannel = subscribeToUserChannel();

    return () => {
      userChannel.unsubscribe();
    };
  }, [subscribeToUserChannel]);

  return users;
}

export default useSetupAllUsers;
