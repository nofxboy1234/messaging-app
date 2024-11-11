import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function New({ friend }) {
  return (
    <>
      <Head title="New friend" />

      <h1>New friend</h1>

      <Form
        friend={friend}
        onSubmit={(form) => {
          form.transform((data) => ({ friend: data }))
          form.post('/friends')
        }}
        submitText="Create friend"
      />

      <br />

      <div>
        <Link href="/friends">Back to friends</Link>
      </div>
    </>
  )
}
