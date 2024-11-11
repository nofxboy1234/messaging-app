import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function Edit({ friend }) {
  return (
    <>
      <Head title="Editing friend" />

      <h1>Editing friend</h1>

      <Form
        friend={friend}
        onSubmit={(form) => {
          form.transform((data) => ({ friend: data }))
          form.patch(`/friends/${friend.id}`)
        }}
        submitText="Update friend"
      />

      <br />

      <div>
        <Link href={`/friends/${friend.id}`}>Show this friend</Link>
        {' | '}
        <Link href="/friends">Back to friends</Link>
      </div>
    </>
  )
}
