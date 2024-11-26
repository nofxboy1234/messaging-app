import { Link, Head, usePage } from '@inertiajs/react';
import Profile from './Profile';
import Layout from '../Layout';
import { useState, useContext } from 'react';
import api from '../../pathHelpers';
import { ChatsContext } from '../Layout';
import IncomingFriendActions from '../IncomingFriend/IncomingFriendActions';

function Show({ profile, isFriend, isOutgoingFriend, isIncomingFriend }) {
  const { shared } = usePage().props;
  const { setChats } = useContext(ChatsContext);

  const [isAFriend, setIsAFriend] = useState(isFriend);
  const [isAnOutgoingFriend, setIsAnOutgoingFriend] =
    useState(isOutgoingFriend);
  const [isAnIncomingFriend, setIsAnIncomingFriend] =
    useState(isIncomingFriend);

  function handleAddOutgoingFriend(e) {
    e.preventDefault();

    const options = {
      onBefore: (visit) =>
        confirm(`Send friend request to ${profile.username}?`),
      onFinish: (visit) => {
        setIsAnOutgoingFriend(true);
      },
    };
    api.outgoingFriends.create({ data: profile.user, options: options });
  }

  function handleRemoveFriend(e) {
    e.preventDefault();

    const options = {
      onBefore: (visit) => confirm(`Unfriend ${profile.username}?`),
      onFinish: (visit) => {
        setIsAFriend(false);
        setChats((chats) => {
          const user1 = shared.profile.username;
          const user2 = profile.username;
          const updatedChats = chats.filter(
            (chat) =>
              chat.name !== `${user1}_${user2}` &&
              chat.name !== `${user2}_${user1}`,
          );
          return updatedChats;
        });
      },
    };

    api.friends.destroy({ obj: profile.user, options: options });
  }

  function handleRemoveOutgoingFriend(e) {
    e.preventDefault();

    const options = {
      onBefore: (visit) =>
        confirm(`Cancel friend request to ${profile.username}?`),
      onFinish: (visit) => {
        setIsAnOutgoingFriend(false);
      },
    };
    api.outgoingFriends.destroy({ obj: profile.user, options: options });
  }

  function friendActions() {
    let friendActions;
    if (isAFriend) {
      friendActions = (
        <Link as="button" type="button" onClick={handleRemoveFriend}>
          Unfriend
        </Link>
      );
    } else if (isAnOutgoingFriend) {
      friendActions = (
        <Link as="button" type="button" onClick={handleRemoveOutgoingFriend}>
          Cancel Friend Request
        </Link>
      );
    } else if (isAnIncomingFriend) {
      friendActions = (
        <IncomingFriendActions user={{ ...profile.user, profile: profile }} />
      );
    } else {
      friendActions =
        shared.current_user.id !== profile.user.id ? (
          <Link as="button" type="button" onClick={handleAddOutgoingFriend}>
            Send Friend Request
          </Link>
        ) : null;
    }

    return friendActions;
  }

  return (
    <>
      <Head title={`Profile #${profile.id}`} />

      <h1>Profile #{profile.id}</h1>

      <Profile profile={profile} />

      <div>
        {shared.current_user.id === profile.user.id ? (
          <Link href={api.profiles.edit.path(profile)}>Edit this profile</Link>
        ) : null}
        <br />
      </div>
      <div>{friendActions()}</div>
    </>
  );
}

export default Show;
