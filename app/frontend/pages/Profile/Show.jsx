import { usePage } from '@inertiajs/react';
import Profile from './Profile';
import UserActions from '../User/Actions';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import api from '../../pathHelpers';
import { useState } from 'react';

function ProfileShow({
  initialProfile,
  relationship,
  friendRequest,
  friendship,
  chat,
}) {
  const [profile, setProfile] = useState(initialProfile);
  const { shared } = usePage().props;

  function currentUserProfile() {
    return shared.current_user.id === profile.user.id;
  }

  return (
    <div>
      <Profile profile={profile} />
      {currentUserProfile() ? (
        <div>
          <Link href={api.profiles.edit.path(profile)}>Edit this profile</Link>
          <div>
            <a
              href="https://gravatar.com/connect/?gravatar_from=signup"
              target="_blank"
            >
              Update avatar
            </a>
          </div>
        </div>
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
  initialProfile: PropTypes.object,
  relationship: PropTypes.string,
  friendRequest: PropTypes.object,
  friendship: PropTypes.object,
  chat: PropTypes.object,
};

export default ProfileShow;
