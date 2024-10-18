import { useForm } from '@inertiajs/react'

export default function Form({ chat, onSubmit, submitText }) {
  const form = useForm({
    name: chat.name || '',
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ display: 'block' }} htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />
        {errors.name && (
          <div style={{ color: 'red' }}>{errors.name.join(', ')}</div>
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
