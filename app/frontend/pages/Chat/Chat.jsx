export default function Chat({ chat }) {
  return (
    <div>
      <p>
        <strong>Name:</strong>
        {chat.name.toString()}
      </p>
    </div>
  )
}
