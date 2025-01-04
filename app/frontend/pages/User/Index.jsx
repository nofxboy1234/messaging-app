import { useEffect, useState } from 'react';
import UserTotal from './Total';
import PropTypes from 'prop-types';
import { createConsumer } from '@rails/actioncable';
import { usePage } from '@inertiajs/react';
import api from '../../pathHelpers';
import ProfileLink from '../Profile/Link';

function UserIndex({ initialUsers, isShowingChat, chat_id }) {
  const [users, setUsers] = useState(initialUsers);
  const { shared } = usePage().props;

  useEffect(() => {
    const consumer = createConsumer();
    let channel;

    function subscribe(
      channelName,
      params,
      connectedCallback,
      receivedCallback,
    ) {
      console.log(`subscribe to ${channelName}`);

      channel = consumer.subscriptions.create(
        { channel: channelName, ...params },
        {
          connected() {
            console.log(`${channelName} connected`);

            if (connectedCallback) {
              connectedCallback();
            }
          },

          received(users) {
            console.log(`${channelName} received`);
            setUsers(users);

            if (receivedCallback) {
              receivedCallback();
            }
          },
        },
      );
    }

    function setup() {
      if (isShowingChat) {
        const connectedCallback = () => {
          api.chatUsersBroadcast.create({
            data: { user_id: shared.current_user.id, chat_id: chat_id },
          });
        };

        subscribe(
          'ChatUserChannel',
          { id: shared.current_user.id },
          connectedCallback,
        );
      } else {
        const connectedCallback = () => {
          api.perUserAllUsersBroadcast.create({
            data: { user_id: shared.current_user.id },
          });
        };

        const receivedCallback = () => {
          channel.unsubscribe();
          subscribe('AllUserChannel');
        };

        subscribe(
          'PerUserAllUserChannel',
          { id: shared.current_user.id },
          connectedCallback,
          receivedCallback,
        );
      }
    }

    console.log('UserIndex effect');
    setup();

    return () => {
      console.log('UserIndex effect cleanup');

      channel.unsubscribe();
      consumer.disconnect();
    };
  }, [shared.current_user.id, isShowingChat, chat_id]);

  console.log('render UserIndex');

  return (
    <div>
      <UserTotal users={users} />
      <div>
        {users.map((user) => (
          <ProfileLink key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

UserIndex.propTypes = {
  initialUsers: PropTypes.array,
  isShowingChat: PropTypes.bool,
  chat_id: PropTypes.number,
};

export default UserIndex;
