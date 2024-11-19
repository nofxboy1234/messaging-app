import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function New({ incoming_friend }) {
  return (
    <>
      <Head title="New incoming friend" />

      <h1>New incoming friend</h1>

      <Form
        incoming_friend={incoming_friend}
        onSubmit={(form) => {
          form.transform((data) => ({ incoming_friend: data }))
          form.post('/incoming_friends')
        }}
        submitText="Create incoming friend"
      />

      <br />

      <div>
        <Link href="/incoming_friends">Back to incoming friends</Link>
      </div>
    </>
  )
}
