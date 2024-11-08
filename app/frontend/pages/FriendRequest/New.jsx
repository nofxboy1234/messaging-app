import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function New({ friend_request }) {
  return (
    <>
      <Head title="New friend request" />

      <h1>New friend request</h1>

      <Form
        friend_request={friend_request}
        onSubmit={(form) => {
          form.transform((data) => ({ friend_request: data }))
          form.post('/friend_requests')
        }}
        submitText="Create friend request"
      />

      <br />

      <div>
        <Link href="/friend_requests">Back to friend requests</Link>
      </div>
    </>
  )
}
