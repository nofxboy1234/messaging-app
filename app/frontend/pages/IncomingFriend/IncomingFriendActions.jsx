import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function IncomingFriendActions({
  user,
  username,
  setIsAnIncomingFriend,
  setIsAFriend,
}) {
  function handleAddIncomingFriend(e) {
    e.preventDefault();

    const options = {
      onBefore: () => confirm(`Accept friend request from ${username}?`),
      onFinish: () => {
        setIsAnIncomingFriend(false);

        const options = {
          onFinish: () => {
            setIsAFriend(true);
          },
        };

        api.friends.create({ data: user, options: options });
      },
    };

    api.incomingFriends.destroy({ obj: user, options: options });
  }

  function handleRemoveIncomingFriend(e) {
    e.preventDefault();

    const options = {
      onBefore: () => confirm(`Reject friend request from ${username}?`),
      onFinish: () => {
        setIsAnIncomingFriend(false);
      },
    };
    api.incomingFriends.destroy({ obj: user, options: options });
  }

  return (
    <>
      <Link as="button" type="button" onClick={handleAddIncomingFriend}>
        Accept Friend Request
      </Link>
      <Link as="button" type="button" onClick={handleRemoveIncomingFriend}>
        Reject Friend Request
      </Link>
    </>
  );
}

export default IncomingFriendActions;
