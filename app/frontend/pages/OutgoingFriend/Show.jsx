import { Link, Head } from '@inertiajs/react'
import OutgoingFriend from './OutgoingFriend'

export default function Show({ outgoing_friend, flash }) {
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this outgoing friend?')) {
      e.preventDefault()
    }
  }

  return (
    <>
      <Head title={`Outgoing friend #${outgoing_friend.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Outgoing friend #{outgoing_friend.id}</h1>

      <OutgoingFriend outgoing_friend={outgoing_friend} />

      <div>
        <Link href={`/outgoing_friends/${outgoing_friend.id}/edit`}>Edit this outgoing friend</Link>
        {' | '}
        <Link href="/outgoing_friends">Back to outgoing friends</Link>

        <br />

        <Link
          href={`/outgoing_friends/${outgoing_friend.id}`}
          onClick={onDestroy}
          as="button"
          method="delete"
        >
          Destroy this outgoing friend
        </Link>
      </div>
    </>
  )
}
