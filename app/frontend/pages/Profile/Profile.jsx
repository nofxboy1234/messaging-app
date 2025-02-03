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
      <div id="header">
        <Picture className="profile-data" src={profile.picture} scale={2} />
        <div className="profile-data">{profile.username}</div>
      </div>
      <div className="profile-data" id="about-me">
        About Me: {profile.about}
      </div>
    </div>
  );
}

const StyledProfile = styled(Profile)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & #header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  & .profile-data {
    min-height: 21px;
  }

  & #about-me {
    background-color: var(--bg-color-hover);
    padding: 1rem;
    border-radius: 8px;
  }
`;

Profile.propTypes = {
  initialProfile: PropTypes.object,
};

export default StyledProfile;
