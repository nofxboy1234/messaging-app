import { useEffect, useState } from 'react';
import UserTotal from './Total';
import User from './User';
import PropTypes from 'prop-types';
import { createConsumer } from '@rails/actioncable';
import { usePage } from '@inertiajs/react';

function UserIndex({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);

  const { shared } = usePage().props;

  useEffect(() => {
    const consumer = createConsumer();
    const channel = consumer.subscriptions.create(
      { channel: 'UserChannel', id: shared.current_user.id },
      {
        connected() {},

        disconnected() {},

        received(users) {
          setUsers(users);
        },
      },
    );

    return () => {
      channel.unsubscribe();
      consumer.disconnect();
    };
  }, [shared.current_user.id]);

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
  initialUsers: PropTypes.array,
};

export default UserIndex;
