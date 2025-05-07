import { useCallback, useEffect, useReducer } from 'react';
import subscribe from '../channels/subscriptions';
import activeChatReducer from '../reducers/activeChatReducer';

function useSetupChatUsers(chat) {
  const [activeChat, dispatch] = useReducer(activeChatReducer, {
    id: chat.id,
    members: chat.members,
  });

  const updateUsers = (users) => {
    dispatch({ type: 'updated_users', users });
  };

  const subscribeToUserChannel = useCallback(() => {
    const userChannelSubscriptionInfo = [
      'ChatUserChannel',
      { id: activeChat.id },
      updateUsers,
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
