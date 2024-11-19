import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function New({ outgoing_friend }) {
  return (
    <>
      <Head title="New outgoing friend" />

      <h1>New outgoing friend</h1>

      <Form
        outgoing_friend={outgoing_friend}
        onSubmit={(form) => {
          form.transform((data) => ({ outgoing_friend: data }))
          form.post('/outgoing_friends')
        }}
        submitText="Create outgoing friend"
      />

      <br />

      <div>
        <Link href="/outgoing_friends">Back to outgoing friends</Link>
      </div>
    </>
  )
}
