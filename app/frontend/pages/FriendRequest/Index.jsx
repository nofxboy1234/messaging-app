import { Link, Head } from '@inertiajs/react'
import FriendRequest from './FriendRequest'

export default function Index({ friend_requests, flash }) {
  return (
    <>
      <Head title="Friend requests" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Friend requests</h1>
      <div>
        {friend_requests.map((friend_request) => (
          <div key={friend_request.id}>
            <FriendRequest friend_request={friend_request} />
            <p>
              <Link href={`/friend_requests/${friend_request.id}`}>Show this friend request</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/friend_requests/new">New friend request</Link>
    </>
  )
}
