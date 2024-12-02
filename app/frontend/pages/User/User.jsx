import Picture from '../Profile/Picture';
import UserLink from './Link';

function User({ user }) {
  return (
    <div>
      <Picture src={user.profile.picture} />
      <UserLink user={user} />
    </div>
  );
}

export default User;
