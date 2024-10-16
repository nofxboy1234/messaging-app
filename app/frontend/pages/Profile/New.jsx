import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function New({ profile }) {
  return (
    <>
      <Head title="New profile" />

      <h1>New profile</h1>

      <Form
        profile={profile}
        onSubmit={(form) => {
          form.transform((data) => ({ profile: data }))
          form.post('/profiles')
        }}
        submitText="Create profile"
      />

      <br />

      <div>
        <Link href="/profiles">Back to profiles</Link>
      </div>
    </>
  )
}
