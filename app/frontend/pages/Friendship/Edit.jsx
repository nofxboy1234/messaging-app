import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function Edit({ friendship }) {
  return (
    <>
      <Head title="Editing friendship" />

      <h1>Editing friendship</h1>

      <Form
        friendship={friendship}
        onSubmit={(form) => {
          form.transform((data) => ({ friendship: data }))
          form.patch(`/friendships/${friendship.id}`)
        }}
        submitText="Update friendship"
      />

      <br />

      <div>
        <Link href={`/friendships/${friendship.id}`}>Show this friendship</Link>
        {' | '}
        <Link href="/friendships">Back to friendships</Link>
      </div>
    </>
  )
}
