import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function Edit({ incoming_friend }) {
  return (
    <>
      <Head title="Editing incoming friend" />

      <h1>Editing incoming friend</h1>

      <Form
        incoming_friend={incoming_friend}
        onSubmit={(form) => {
          form.transform((data) => ({ incoming_friend: data }))
          form.patch(`/incoming_friends/${incoming_friend.id}`)
        }}
        submitText="Update incoming friend"
      />

      <br />

      <div>
        <Link href={`/incoming_friends/${incoming_friend.id}`}>Show this incoming friend</Link>
        {' | '}
        <Link href="/incoming_friends">Back to incoming friends</Link>
      </div>
    </>
  )
}
