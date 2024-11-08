import { Link, Head } from '@inertiajs/react'
import Friendship from './Friendship'

export default function Index({ friendships, flash }) {
  return (
    <>
      <Head title="Friendships" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Friendships</h1>
      <div>
        {friendships.map((friendship) => (
          <div key={friendship.id}>
            <Friendship friendship={friendship} />
            <p>
              <Link href={`/friendships/${friendship.id}`}>Show this friendship</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/friendships/new">New friendship</Link>
    </>
  )
}
