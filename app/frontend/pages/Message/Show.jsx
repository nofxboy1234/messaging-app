import { Link, Head } from '@inertiajs/react'
import Message from './Message'

export default function Show({ message, flash }) {
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      e.preventDefault()
    }
  }

  return (
    <>
      <Head title={`Message #${message.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Message #{message.id}</h1>

      <Message message={message} />

      <div>
        <Link href={`/messages/${message.id}/edit`}>Edit this message</Link>
        {' | '}
        <Link href="/messages">Back to messages</Link>

        <br />

        <Link
          href={`/messages/${message.id}`}
          onClick={onDestroy}
          as="button"
          method="delete"
        >
          Destroy this message
        </Link>
      </div>
    </>
  )
}
