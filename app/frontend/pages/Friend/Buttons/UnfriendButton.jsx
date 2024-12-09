import { Link, usePage } from '@inertiajs/react';
import api from '../../../pathHelpers';
import { useContext } from 'react';
import { LayoutContext } from '../../Layout';
import PropTypes from 'prop-types';

function UnfriendButton({ friend }) {
  const { setChats } = useContext(LayoutContext);
  const { shared } = usePage().props;

  function handleUnfriend(e) {
    e.preventDefault();

    const options = {
      onBefore: () => confirm(`Unfriend ${friend.profile.username}?`),
      onFinish: () => {
        setChats((chats) => {
          const user1 = shared.profile.username;
          const user2 = friend.profile.username;
          const updatedChats = chats.filter(
            (chat) =>
              chat.name !== `${user1}_${user2}` &&
              chat.name !== `${user2}_${user1}`,
          );
          return updatedChats;
        });
      },
    };

    api.friends.destroy({ obj: friend, options: options });
  }

  return (
    <Link as="button" type="button" onClick={handleUnfriend}>
      Unfriend
    </Link>
  );
}

UnfriendButton.propTypes = {
  friend: PropTypes.object,
};

export default UnfriendButton;
