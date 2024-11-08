import { useForm } from '@inertiajs/react'

export default function Form({ friendship, onSubmit, submitText }) {
  const form = useForm({
    user_id: friendship.user_id || '',
    friend_id: friendship.friend_id || '',
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <label style={{ display: 'block' }} htmlFor="friend">
          Friend
        </label>
        <input
          type="text"
          name="friend"
          id="friend"
          value={data.friend_id}
          onChange={(e) => setData('friend_id', e.target.value)}
        />
        {errors.friend_id && (
          <div style={{ color: 'red' }}>{errors.friend_id.join(', ')}</div>
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
