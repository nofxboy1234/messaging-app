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
    };
  }, [profile.id]);

  return (
    <div className={className}>
      <Picture className="profile-data" src={profile.picture} />
      <div className="profile-data">{profile.username}</div>
      <div className="profile-data">{profile.about}</div>
    </div>
  );
}

const StyledProfile = styled(Profile)`
  display: flex;
  flex-direction: column;

  border: 1px solid var(--border-color);

  & .profile-data {
    min-height: 21px;
  }
`;

Profile.propTypes = {
  initialProfile: PropTypes.object,
};

export default StyledProfile;
