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
    console.log('subscribed: ', userChannel.identifier);

    return userChannel;
  }, []);

  useEffect(() => {
    console.log('~*~*~*');

    const userChannel = subscribeToUserChannel();

    return () => {
      console.log('------');
      userChannel.unsubscribe();
      console.log('unsubscribed: ', userChannel.identifier);
    };
  }, [subscribeToUserChannel]);

  const prevValues = usePreviousValues({
    subscribeToUserChannel,
  });
  logChangedValues(...prevValues);

  return users;
}

export default useSetupAllUsers;
