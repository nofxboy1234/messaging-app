import { Link, Head } from '@inertiajs/react';
import Profile from './Profile';
import Layout from '../Layout';

export default function Show({ profile, shared }) {
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this profile?')) {
      e.preventDefault();
    }
  };

  return (
    <Layout>
      <Head title={`Profile #${profile.id}`} />

      {shared.flash.notice && (
        <p style={{ color: 'green' }}>{shared.flash.notice}</p>
      )}

      <h1>Profile #{profile.id}</h1>

      <Profile profile={profile} />

      <div>
        <Link href={`/profiles/${profile.id}/edit`}>Edit this profile</Link>

        <br />
      </div>
      <div>
        <Link href={'#'}>Add Friend</Link>
      </div>
    </Layout>
  );
}
