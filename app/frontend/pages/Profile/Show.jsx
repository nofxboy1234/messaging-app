import { usePage } from '@inertiajs/react';
import Profile from './Profile';
import UserActions from '../User/Actions';
import ProfileActions from './Actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ProfileShow({
  className,
  profile,
  relationship,
  friendRequest,
  friendship,
  chat,
}) {
  const { shared } = usePage().props;

  function currentUserProfile() {
    return shared.current_user.id === profile.user.id;
  }

  return (
    <div id="profile-show" className={className}>
      <div id="profile-container">
        <Profile initialProfile={profile} />
        {currentUserProfile() ? (
          <ProfileActions profile={profile} />
        ) : (
          <UserActions
            profileUser={profile.user}
            initialRelationship={relationship}
            initialFriendRequest={friendRequest}
            initialFriendship={friendship}
            initialChat={chat}
          />
        )}
      </div>
    </div>
  );
}

ProfileShow.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
  relationship: PropTypes.string,
  friendRequest: PropTypes.object,
  friendship: PropTypes.object,
  chat: PropTypes.object,
};

const StyledProfileShow = styled(ProfileShow)`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  max-height: 350px;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;

  & #profile-container {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export default StyledProfileShow;
