import Picture from './Picture';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { createConsumer } from '@rails/actioncable';

function Profile({ initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    const consumer = createConsumer();
    const channel = consumer.subscriptions.create(
      {
        channel: 'ProfileChannel',
        id: profile.id,
      },
      {
        connected() {},
        disconnected() {},
        received(data) {
          setProfile(data);
        },
      },
    );

    return () => {
      channel.unsubscribe();
      consumer.disconnect();
    };
  }, [profile.id]);

  return (
    <div>
      <Picture src={profile.picture} />
      <div>{profile.username}</div>
      <div>{profile.about}</div>
    </div>
  );
}

Profile.propTypes = {
  initialProfile: PropTypes.object,
};

export default Profile;
