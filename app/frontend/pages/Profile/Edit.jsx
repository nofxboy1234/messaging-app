import { Link, Head } from '@inertiajs/react';
import Form from './Form';
import Layout from '../Layout';

export default function Edit({ profile }) {
  return (
    <Layout>
      <Head title="Editing profile" />

      <h1>Editing profile</h1>

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
        <Link href={`/profiles/${profile.id}`}>Show this profile</Link>
      </div>
    </Layout>
  );
}
