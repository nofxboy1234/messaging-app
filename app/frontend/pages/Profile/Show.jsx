import { usePage } from '@inertiajs/react';
import Profile from './Profile';
import UserActions from '../User/Actions';
import ProfileActions from './Actions';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';

function ProfileShow({
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
    <div>
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
  profile: PropTypes.object,
  relationship: PropTypes.string,
  friendRequest: PropTypes.object,
  friendship: PropTypes.object,
  chat: PropTypes.object,
};

export default ProfileShow;
