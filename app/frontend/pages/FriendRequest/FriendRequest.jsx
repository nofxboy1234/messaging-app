export default function FriendRequest({ friend_request }) {
  return (
    <div>
      <p>
        <strong>User:</strong>
        {friend_request.user_id.toString()}
      </p>
      <p>
        <strong>Friend:</strong>
        {friend_request.friend_id.toString()}
      </p>
    </div>
  )
}
