import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import { useContext } from 'react';
import { ChatsContext } from '../Layout';

function FriendActions({ shared, user }) {
  const { setChats } = useContext(ChatsContext);

  function unfriend(e) {
    e.preventDefault();

    const options = {
      onBefore: () => confirm(`Unfriend ${user.profile.username}?`),
      onFinish: () => {
        setChats((chats) => {
          const user1 = shared.profile.username;
          const user2 = user.profile.username;
          const updatedChats = chats.filter(
            (chat) =>
              chat.name !== `${user1}_${user2}` &&
              chat.name !== `${user2}_${user1}`,
          );
          return updatedChats;
        });
      },
    };

    api.friends.destroy({ obj: user, options: options });
  }

  return (
    <>
      <Link as="button" type="button" onClick={unfriend}>
        Unfriend
      </Link>
    </>
  );
}

export default FriendActions;
