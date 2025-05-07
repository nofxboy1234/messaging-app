function allUsersReducer(users, action) {
  switch (action.type) {
    case 'updated_users': {
      return action.users;
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default allUsersReducer;
