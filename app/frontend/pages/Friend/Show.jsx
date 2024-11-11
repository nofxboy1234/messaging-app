import { Link, Head } from '@inertiajs/react'
import Friend from './Friend'

export default function Show({ friend, flash }) {
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this friend?')) {
      e.preventDefault()
    }
  }

  return (
    <>
      <Head title={`Friend #${friend.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Friend #{friend.id}</h1>

      <Friend friend={friend} />

      <div>
        <Link href={`/friends/${friend.id}/edit`}>Edit this friend</Link>
        {' | '}
        <Link href="/friends">Back to friends</Link>

        <br />

        <Link
          href={`/friends/${friend.id}`}
          onClick={onDestroy}
          as="button"
          method="delete"
        >
          Destroy this friend
        </Link>
      </div>
    </>
  )
}
