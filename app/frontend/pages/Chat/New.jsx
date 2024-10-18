import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function New({ chat }) {
  return (
    <>
      <Head title="New chat" />

      <h1>New chat</h1>

      <Form
        chat={chat}
        onSubmit={(form) => {
          form.transform((data) => ({ chat: data }))
          form.post('/chats')
        }}
        submitText="Create chat"
      />

      <br />

      <div>
        <Link href="/chats">Back to chats</Link>
      </div>
    </>
  )
}
