import { useForm } from '@inertiajs/react'

export default function Form({ message, onSubmit, submitText }) {
  const form = useForm({
    body: message.body || '',
    user_id: message.user_id || '',
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ display: 'block' }} htmlFor="body">
          Body
        </label>
        <input
          type="text"
          name="body"
          id="body"
          value={data.body}
          onChange={(e) => setData('body', e.target.value)}
        />
        {errors.body && (
          <div style={{ color: 'red' }}>{errors.body.join(', ')}</div>
        )}
      </div>
      <div>
        <label style={{ display: 'block' }} htmlFor="user">
          User
        </label>
        <input
          type="text"
          name="user"
          id="user"
          value={data.user_id}
          onChange={(e) => setData('user_id', e.target.value)}
        />
        {errors.user_id && (
          <div style={{ color: 'red' }}>{errors.user_id.join(', ')}</div>
        )}
      </div>
      <div>
        <button type="submit" disabled={processing}>
          {submitText}
        </button>
      </div>
    </form>
  )
}
