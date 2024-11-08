export default function Friendship({ friendship }) {
  return (
    <div>
      <p>
        <strong>User:</strong>
        {friendship.user_id.toString()}
      </p>
      <p>
        <strong>Friend:</strong>
        {friendship.friend_id.toString()}
      </p>
    </div>
  )
}
