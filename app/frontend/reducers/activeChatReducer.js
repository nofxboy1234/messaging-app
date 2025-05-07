function activeChatReducer(activeChat, action) {
  switch (action.type) {
    case 'updated_users': {
      return { ...activeChat, members: [...action.users] };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default activeChatReducer;
