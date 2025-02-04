import { useEffect, useState } from 'react';
import UserTotal from './Total';
import PropTypes from 'prop-types';
import consumer from '../../channels/consumer';
import { usePage } from '@inertiajs/react';
import api from '../../pathHelpers';
import ProfileLink from '../Profile/Link';
import styled from 'styled-components';

function UserIndex({ className, initialUsers, isShowingChat, chat_id }) {
  const [users, setUsers] = useState(initialUsers);
  const { shared } = usePage().props;

  useEffect(() => {
    let channel;

    function subscribe(
      channelName,
      params,
      connectedCallback,
      receivedCallback,
    ) {
      channel = consumer.subscriptions.create(
        { channel: channelName, ...params },
        {
          connected() {
            if (connectedCallback) {
              connectedCallback();
            }
          },

          received(users) {
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

    setup();

    return () => {
      channel.unsubscribe();
    };
  }, [shared.current_user.id, isShowingChat, chat_id]);

  return (
    <div className={className}>
      <UserTotal users={users} />
      <div id="users">
        {users.map((user) => (
          <ProfileLink key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

UserIndex.propTypes = {
  className: PropTypes.string,
  initialUsers: PropTypes.array,
  isShowingChat: PropTypes.bool,
  chat_id: PropTypes.number,
};

const StyledUserIndex = styled(UserIndex)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  border: 1px solid var(--border-color);

  & > div#users {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
  }
`;

export default StyledUserIndex;
