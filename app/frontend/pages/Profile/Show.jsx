import { usePage } from '@inertiajs/react';
import Profile from './Profile';
import UserActions from '../User/Actions';

function Show({ profile, initialRelationship }) {
  const { shared } = usePage().props;

  return (
    <div>
      <Profile currentUser={shared.current_user} profile={profile} />
      <UserActions
        user={profile.user}
        initialRelationship={initialRelationship}
      />
    </div>
  );
}

export default Show;
