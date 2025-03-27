function usersReducer(users, action) {
  switch (action.type) {
    case 'added_user': {
      return [...users, action.user];
    }
    case 'reinitialized_users': {
      return action.users;
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default usersReducer;
