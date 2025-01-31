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
  align-self: center;
  max-width: 400px;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
`;

export default StyledProfileShow;
