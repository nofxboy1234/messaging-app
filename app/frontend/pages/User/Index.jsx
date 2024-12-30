import { useEffect, useState } from 'react';
import UserTotal from './Total';
import User from './User';
import PropTypes from 'prop-types';
import { createConsumer } from '@rails/actioncable';
import { usePage } from '@inertiajs/react';
import api from '../../pathHelpers';

function UserIndex({ initialUsers, chat }) {
  const [users, setUsers] = useState(initialUsers);
  const { shared } = usePage().props;

  useEffect(() => {
    const consumer = createConsumer();
    let channel;

    function subscribe(channelName, params, connectedCallback) {
      console.log(`subscribe to ${channelName}`);

      channel = consumer.subscriptions.create(
        { channel: channelName, ...params },
        {
          connected() {
            console.log(`${channelName} connected`);
            connectedCallback();
          },

          received(users) {
            console.log(`${channelName} received`);
            setUsers(users);
          },
        },
      );
    }

    function setup() {
      if (chat) {
        const connectedCallback = () => {
          api.chatUsersBroadcast.create({
            data: { user_id: shared.current_user.id, chat_id: chat.id },
          });
        };

        subscribe(
          'ChatUserChannel',
          { id: shared.current_user.id },
          connectedCallback,
        );
      } else {
        const connectedCallback = () => {
          api.allUsersBroadcast.create();
        };

        subscribe('AllUserChannel', {}, connectedCallback);
      }
    }

    console.log('UserIndex effect');
    setup();

    return () => {
      console.log('UserIndex effect cleanup');

      channel.unsubscribe();
      consumer.disconnect();
    };
  }, [shared.current_user.id, chat]);

  console.log('render UserIndex');

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
  chat: PropTypes.object,
};

export default UserIndex;
