import Picture from './Picture';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import consumer from '../../channels/consumer';
import styled from 'styled-components';

function Profile({ className, initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
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
    <div className={className}>
      <Picture src={profile.picture} />
      <div>{profile.username}</div>
      <div>{profile.about}</div>
    </div>
  );
}

const StyledProfile = styled(Profile)`
  border: 1px solid black;
  background-color: whitesmoke;
`;

Profile.propTypes = {
  initialProfile: PropTypes.object,
};

export default StyledProfile;
