import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function Edit({ chat }) {
  return (
    <>
      <Head title="Editing chat" />

      <h1>Editing chat</h1>

      <Form
        chat={chat}
        onSubmit={(form) => {
          form.transform((data) => ({ chat: data }))
          form.patch(`/chats/${chat.id}`)
        }}
        submitText="Update chat"
      />

      <br />

      <div>
        <Link href={`/chats/${chat.id}`}>Show this chat</Link>
        {' | '}
        <Link href="/chats">Back to chats</Link>
      </div>
    </>
  )
}
