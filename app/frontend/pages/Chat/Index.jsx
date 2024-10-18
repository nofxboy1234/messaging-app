import { Link, Head } from '@inertiajs/react'
import Chat from './Chat'

export default function Index({ chats, flash }) {
  return (
    <>
      <Head title="Chats" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Chats</h1>
      <div>
        {chats.map((chat) => (
          <div key={chat.id}>
            <Chat chat={chat} />
            <p>
              <Link href={`/chats/${chat.id}`}>Show this chat</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/chats/new">New chat</Link>
    </>
  )
}
