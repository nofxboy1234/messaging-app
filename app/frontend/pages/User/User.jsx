import ProfilePicture from '../Profile/Picture';
import UserLink from './Link';

function User({ user }) {
  return (
    <div>
      <ProfilePicture src={user.profile.picture} />
      <UserLink user={user} />
    </div>
  );
}

export default User;
