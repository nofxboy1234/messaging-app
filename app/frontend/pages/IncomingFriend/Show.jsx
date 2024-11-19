import { Link, Head } from '@inertiajs/react'
import IncomingFriend from './IncomingFriend'

export default function Show({ incoming_friend, flash }) {
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this incoming friend?')) {
      e.preventDefault()
    }
  }

  return (
    <>
      <Head title={`Incoming friend #${incoming_friend.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Incoming friend #{incoming_friend.id}</h1>

      <IncomingFriend incoming_friend={incoming_friend} />

      <div>
        <Link href={`/incoming_friends/${incoming_friend.id}/edit`}>Edit this incoming friend</Link>
        {' | '}
        <Link href="/incoming_friends">Back to incoming friends</Link>

        <br />

        <Link
          href={`/incoming_friends/${incoming_friend.id}`}
          onClick={onDestroy}
          as="button"
          method="delete"
        >
          Destroy this incoming friend
        </Link>
      </div>
    </>
  )
}
