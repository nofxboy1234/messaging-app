import { Link, Head } from '@inertiajs/react';
import Profile from './Profile';

export default function Index({ profiles, shared }) {
  return (
    <>
      <Head title="Profiles" />

      {shared.flash.notice && (
        <p style={{ color: 'green' }}>{shared.flash.notice}</p>
      )}

      <h1>Profiles</h1>
      <div>
        {profiles.map((profile) => (
          <div key={profile.id}>
            <Profile profile={profile} />
            <p>
              <Link href={`/profiles/${profile.id}`}>Show this profile</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/profiles/new">New profile</Link>
    </>
  );
}
