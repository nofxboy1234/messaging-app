import { Link, Head } from '@inertiajs/react';
import Form from './Form';
import api from '../../pathHelpers';

export default function Edit({ profile }) {
  return (
    <div>
      <Form
        profile={profile}
        onSubmit={(form) => {
          form.transform((data) => ({ profile: data }));
          form.patch(`/profiles/${profile.id}`);
        }}
        submitText="Update profile"
      />

      <br />

      <div>
        <Link href={api.profiles.show.path(profile)}>Show this profile</Link>
      </div>
    </div>
  );
}
