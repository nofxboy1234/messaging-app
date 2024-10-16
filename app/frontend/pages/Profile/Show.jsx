import { Link, Head } from '@inertiajs/react';
import Profile from './Profile';

export default function Show({ profile, shared }) {
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this profile?')) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Head title={`Profile #${profile.id}`} />

      {shared.flash.notice && (
        <p style={{ color: 'green' }}>{shared.flash.notice}</p>
      )}

      <h1>Profile #{profile.id}</h1>

      <Profile profile={profile} />

      <div>
        <Link href={`/profiles/${profile.id}/edit`}>Edit this profile</Link>
        {' | '}
        <Link href="/profiles">Back to profiles</Link>

        <br />

        <Link
          href={`/profiles/${profile.id}`}
          onClick={onDestroy}
          as="button"
          method="delete"
        >
          Destroy this profile
        </Link>
      </div>
    </>
  );
}
