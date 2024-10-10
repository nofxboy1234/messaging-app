import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function New({ message }) {
  return (
    <>
      <Head title="New message" />

      <h1>New message</h1>

      <Form
        message={message}
        onSubmit={(form) => {
          form.transform((data) => ({ message: data }))
          form.post('/messages')
        }}
        submitText="Create message"
      />

      <br />

      <div>
        <Link href="/messages">Back to messages</Link>
      </div>
    </>
  )
}
