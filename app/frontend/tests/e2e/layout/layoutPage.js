const createLayout = (page) => ({
  homeLink: page.getByRole('link', { name: 'Home' }),
  friendsLink: page.getByRole('link', { name: 'Friends' }),
  profileLink: page.getByRole('link', { name: 'Profile (user1)' }),
  logoutButton: page.getByRole('button', { name: 'Log out' }),
  chatTotal: page.getByText('CHATS-2'),
  user1ChatLink: page
    .getByTestId('chat-index')
    .getByRole('link', { name: 'user1' }),
  user4ChatLink: page
    .getByTestId('chat-index')
    .getByRole('link', { name: 'user4' }),
  user5ChatLink: page
    .getByTestId('chat-index')
    .getByRole('link', { name: 'user5' }),

  friendTotal: page.getByText('ALL FRIENDS-2'),
  user1FriendLink: page
    .getByTestId('friend-index')
    .getByRole('link', { name: 'user1' }),
  user4FriendLink: page
    .getByTestId('friend-index')
    .getByRole('link', { name: 'user4' }),
  user5FriendLink: page
    .getByTestId('friend-index')
    .getByRole('link', { name: 'user5' }),

  allUserTotal: page.getByText('USERS-6'),
  user1UserLink: page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user1' }),
  user2UserLink: page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user2' }),
  user3UserLink: page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user3' }),
  user4UserLink: page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user4' }),
  user5UserLink: page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user5' }),
  user6UserLink: page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user6' }),
});

export default createLayout;
