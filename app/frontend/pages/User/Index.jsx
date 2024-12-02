import Total from './Total';
import User from './User';

function Index({ users }) {
  return (
    <div>
      <Total users={users} />
      <div>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Index;
