import UserTotal from './Total';
import User from './User';
import PropTypes from 'prop-types';

function UserIndex({ users }) {
  return (
    <div>
      <UserTotal users={users} />
      <div>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

UserIndex.propTypes = {
  users: PropTypes.array,
};

export default UserIndex;
