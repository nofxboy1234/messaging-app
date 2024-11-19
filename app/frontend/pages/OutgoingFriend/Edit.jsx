import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function Edit({ outgoing_friend }) {
  return (
    <>
      <Head title="Editing outgoing friend" />

      <h1>Editing outgoing friend</h1>

      <Form
        outgoing_friend={outgoing_friend}
        onSubmit={(form) => {
          form.transform((data) => ({ outgoing_friend: data }))
          form.patch(`/outgoing_friends/${outgoing_friend.id}`)
        }}
        submitText="Update outgoing friend"
      />

      <br />

      <div>
        <Link href={`/outgoing_friends/${outgoing_friend.id}`}>Show this outgoing friend</Link>
        {' | '}
        <Link href="/outgoing_friends">Back to outgoing friends</Link>
      </div>
    </>
  )
}
