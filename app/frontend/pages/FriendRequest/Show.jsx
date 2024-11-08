import { Link, Head } from '@inertiajs/react'
import FriendRequest from './FriendRequest'

export default function Show({ friend_request, flash }) {
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this friend request?')) {
      e.preventDefault()
    }
  }

  return (
    <>
      <Head title={`Friend request #${friend_request.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Friend request #{friend_request.id}</h1>

      <FriendRequest friend_request={friend_request} />

      <div>
        <Link href={`/friend_requests/${friend_request.id}/edit`}>Edit this friend request</Link>
        {' | '}
        <Link href="/friend_requests">Back to friend requests</Link>

        <br />

        <Link
          href={`/friend_requests/${friend_request.id}`}
          onClick={onDestroy}
          as="button"
          method="delete"
        >
          Destroy this friend request
        </Link>
      </div>
    </>
  )
}
