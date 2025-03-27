function allUsersReducer(users, action) {
  switch (action.type) {
    case 'added_user': {
      return [...users, action.user];
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default allUsersReducer;
