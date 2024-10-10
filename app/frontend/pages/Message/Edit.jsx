import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function Edit({ message }) {
  return (
    <>
      <Head title="Editing message" />

      <h1>Editing message</h1>

      <Form
        message={message}
        onSubmit={(form) => {
          form.transform((data) => ({ message: data }))
          form.patch(`/messages/${message.id}`)
        }}
        submitText="Update message"
      />

      <br />

      <div>
        <Link href={`/messages/${message.id}`}>Show this message</Link>
        {' | '}
        <Link href="/messages">Back to messages</Link>
      </div>
    </>
  )
}
