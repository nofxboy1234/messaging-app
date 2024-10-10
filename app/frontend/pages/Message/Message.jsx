export default function Message({ message }) {
  return (
    <div>
      <p>
        <strong>Body:</strong>
        {message.body.toString()}
      </p>
      <p>
        <strong>User:</strong>
        {message.user_id.toString()}
      </p>
    </div>
  )
}
