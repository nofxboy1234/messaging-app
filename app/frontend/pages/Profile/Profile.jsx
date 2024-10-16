export default function Profile({ profile }) {
  return (
    <div>
      <p>
        <strong>Username:</strong>
        {profile.username.toString()}
      </p>
      <p>
        <strong>Picture:</strong>
        {profile.picture.toString()}
      </p>
      <p>
        <strong>About:</strong>
        {profile.about.toString()}
      </p>
    </div>
  );
}
