import { Link, Head } from '@inertiajs/react'
import Message from './Message'

export default function Index({ messages, flash }) {
  return (
    <>
      <Head title="Messages" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Messages</h1>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <Message message={message} />
            <p>
              <Link href={`/messages/${message.id}`}>Show this message</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/messages/new">New message</Link>
    </>
  )
}
