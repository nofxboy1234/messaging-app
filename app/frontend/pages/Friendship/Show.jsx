import { Link, Head } from '@inertiajs/react'
import Friendship from './Friendship'

export default function Show({ friendship, flash }) {
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this friendship?')) {
      e.preventDefault()
    }
  }

  return (
    <>
      <Head title={`Friendship #${friendship.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Friendship #{friendship.id}</h1>

      <Friendship friendship={friendship} />

      <div>
        <Link href={`/friendships/${friendship.id}/edit`}>Edit this friendship</Link>
        {' | '}
        <Link href="/friendships">Back to friendships</Link>

        <br />

        <Link
          href={`/friendships/${friendship.id}`}
          onClick={onDestroy}
          as="button"
          method="delete"
        >
          Destroy this friendship
        </Link>
      </div>
    </>
  )
}
