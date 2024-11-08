import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function New({ friendship }) {
  return (
    <>
      <Head title="New friendship" />

      <h1>New friendship</h1>

      <Form
        friendship={friendship}
        onSubmit={(form) => {
          form.transform((data) => ({ friendship: data }))
          form.post('/friendships')
        }}
        submitText="Create friendship"
      />

      <br />

      <div>
        <Link href="/friendships">Back to friendships</Link>
      </div>
    </>
  )
}
