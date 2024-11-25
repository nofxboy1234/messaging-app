import { Link, Head } from '@inertiajs/react';
import Profile from './Profile';
import Layout from '../Layout';
import api from '../../pathHelpers';
import UserActions from '../UserActions/UserActions';

function Show({ shared, profile, userType }) {
  return (
    <>
      <Head title={`Profile #${profile.id}`} />

      <h1>Profile #{profile.id}</h1>

      <Profile profile={profile} />

      <div>
        {shared.current_user.id === profile.user.id ? (
          <Link href={api.profiles.edit.path(profile)}>Edit this profile</Link>
        ) : null}
        <br />
      </div>
      <div>
        <UserActions user={profile.user} userType={userType} />
      </div>
    </>
  );
}

Show.layout = (page) => <Layout children={page} />;

export default Show;
