import { useCallback, useEffect, useReducer } from 'react';
import subscribe from '../channels/subscriptions';
import allUsersReducer from '../reducers/allUsersReducer';

function useSetupAllUsers(initialUsers) {
  const [users, dispatch] = useReducer(allUsersReducer, initialUsers);

  const updateUsers = (users) => {
    dispatch({ type: 'updated_users', users });
  };

  const subscribeToUserChannel = useCallback(() => {
    const userChannelSubscriptionInfo = ['AllUserChannel', {}, updateUsers];
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
