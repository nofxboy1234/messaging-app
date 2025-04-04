import { useCallback, useEffect, useReducer } from 'react';
import logChangedValues from '../helpers/logChangedValues';
import usePreviousValues from './usePreviousValues';
import subscribe from '../channels/subscriptions';
import allUsersReducer from '../reducers/allUsersReducer';

function useSetupAllUsers(initialUsers) {
  const [users, dispatch] = useReducer(allUsersReducer, initialUsers);

  const addUser = (user) => {
    dispatch({ type: 'added_user', user: user });
  };

  const subscribeToUserChannel = useCallback(() => {
    let userChannel;
    const userChannelSubscriptionInfo = ['AllUserChannel', {}, addUser];
    userChannel = subscribe(...userChannelSubscriptionInfo);

    return userChannel;
  }, []);

  useEffect(() => {
    const userChannel = subscribeToUserChannel();

    return () => {
      userChannel.unsubscribe();
    };
  }, [subscribeToUserChannel]);

  const prevValues = usePreviousValues({
    subscribeToUserChannel,
  });
  logChangedValues(...prevValues);

  return users;
}

export default useSetupAllUsers;
