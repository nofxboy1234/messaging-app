import { useCallback, useEffect, useReducer } from 'react';
import subscribe from '../channels/subscriptions';
import activeChatReducer from '../reducers/activeChatReducer';

function useSetupChatUsers(chat) {
  const [activeChat, dispatch] = useReducer(activeChatReducer, {
    id: chat.id,
    members: chat.members,
  });

  const addUser = (user) => {
    dispatch({ type: 'added_user', user: user });
  };

  const subscribeToUserChannel = useCallback(() => {
    const userChannelSubscriptionInfo = [
      'ChatUserChannel',
      { id: activeChat.id },
      addUser,
    ];
    const userChannel = subscribe(...userChannelSubscriptionInfo);

    return userChannel;
  }, [activeChat.id]);

  useEffect(() => {
    const userChannel = subscribeToUserChannel();

    return () => {
      userChannel.unsubscribe();
    };
  }, [subscribeToUserChannel]);

  return activeChat.members;
}

export default useSetupChatUsers;
