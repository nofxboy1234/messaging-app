import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function Edit({ friend_request }) {
  return (
    <>
      <Head title="Editing friend request" />

      <h1>Editing friend request</h1>

      <Form
        friend_request={friend_request}
        onSubmit={(form) => {
          form.transform((data) => ({ friend_request: data }))
          form.patch(`/friend_requests/${friend_request.id}`)
        }}
        submitText="Update friend request"
      />

      <br />

      <div>
        <Link href={`/friend_requests/${friend_request.id}`}>Show this friend request</Link>
        {' | '}
        <Link href="/friend_requests">Back to friend requests</Link>
      </div>
    </>
  )
}
