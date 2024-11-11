export default function Friend({ friend }) {
  return (
    <div>
      <p>
        <strong>User:</strong>
        {friend.email.toString()}
      </p>
    </div>
  );
}
