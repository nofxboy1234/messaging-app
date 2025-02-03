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
      <div>
        <div>About Me:</div>
        <div id="about-me-container">
          <div className="profile-data" id="about-me">
            {profile.about}
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledProfile = styled(Profile)`
  flex: 1 1 0;
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

  & #about-me-container {
    flex: 1 1 0;
    display: flex;
  }

  & #about-me {
    background-color: var(--bg-color-grey);
    border-radius: 8px;
    overflow-wrap: anywhere;
  }
`;

Profile.propTypes = {
  initialProfile: PropTypes.object,
};

export default StyledProfile;
