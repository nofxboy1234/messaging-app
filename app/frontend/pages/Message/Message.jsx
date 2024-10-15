export default function Message({ message }) {
  return (
    <div>
      <div>{message.username.toString()}</div>
      <div>{message.body.toString()}</div>
    </div>
  );
}
