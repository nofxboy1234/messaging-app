import { usePage } from '@inertiajs/react';
import Profile from './Profile';
import UserActions from '../User/Actions';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import { useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';

function ProfileShow({
  initialProfile,
  initialRelationship,
  initialFriendRequest,
  initialFriendship,
  initialChat,
}) {
  const [profile, setProfile] = useState(initialProfile);
  const [relationship, setRelationship] = useState(initialRelationship);
  const [friendRequest, setFriendRequest] = useState(initialFriendRequest);
  const [friendship, setFriendship] = useState(initialFriendship);
  const [chat, setChat] = useState(initialChat);

  const { shared } = usePage().props;

  console.log('profile');
  console.log(profile);

  useEffect(() => {
    const consumer = createConsumer();
    const channel = consumer.subscriptions.create(
      { channel: 'ProfileChannel', id: profile.id },
      {
        connected() {
          console.log('*** frontend ProfileChannel connected ***');
        },

        disconnected() {
          console.log('*** frontend ProfileChannel disconnected ***');
        },

        received(data) {
          console.log('*** frontend ProfileChannel received ***');
          console.log(`data: ${data}`);
          setProfile(data.initialProfile);
          setRelationship(data.initialRelationship);
          setFriendRequest(data.initialFriendRequest);
          setFriendship(data.initialFriendship);
          setChat(data.initialChat);
        },
      },
    );

    return () => {
      channel.unsubscribe();
      consumer.disconnect();
    };
  }, [profile.id]);

  function currentUserProfile() {
    return shared.current_user.id === profile.user.id;
  }

  return (
    <div>
      <Profile profile={profile} />
      {currentUserProfile() ? (
        <Link href={api.profiles.edit.path(profile)}>Edit this profile</Link>
      ) : (
        <UserActions
          user={profile.user}
          relationship={relationship}
          friendRequest={friendRequest}
          friendship={friendship}
          chat={chat}
        />
      )}
    </div>
  );
}

ProfileShow.propTypes = {
  initialProfile: PropTypes.object,
  initialRelationship: PropTypes.string,
  initialFriendRequest: PropTypes.object,
  initialFriendship: PropTypes.object,
  initialChat: PropTypes.object,
};

export default ProfileShow;
