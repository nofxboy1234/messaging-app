function activeChatReducer(activeChat, action) {
  switch (action.type) {
    case 'added_user': {
      return { ...activeChat, members: [...activeChat.members, action.user] };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default activeChatReducer;
