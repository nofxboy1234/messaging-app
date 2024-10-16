import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function Edit({ profile }) {
  return (
    <>
      <Head title="Editing profile" />

      <h1>Editing profile</h1>

      <Form
        profile={profile}
        onSubmit={(form) => {
          form.transform((data) => ({ profile: data }))
          form.patch(`/profiles/${profile.id}`)
        }}
        submitText="Update profile"
      />

      <br />

      <div>
        <Link href={`/profiles/${profile.id}`}>Show this profile</Link>
        {' | '}
        <Link href="/profiles">Back to profiles</Link>
      </div>
    </>
  )
}
