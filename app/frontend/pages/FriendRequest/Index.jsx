import OutgoingFriendRequest from './OutgoingFriendRequest';
import IncomingFriendRequest from './IncomingFriendRequest';
import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import consumer from '../../channels/consumer';
import styled from 'styled-components';

function FriendRequestIndex({
  className,
  initialOutgoingFriendRequests,
  initialIncomingFriendRequests,
}) {
  const [outgoingFriendRequests, setOutgoingFriendRequests] = useState(
    initialOutgoingFriendRequests,
  );
  const [incomingFriendRequests, setIncomingFriendRequests] = useState(
    initialIncomingFriendRequests,
  );

  const { shared } = usePage().props;

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      { channel: 'FriendRequestChannel', id: shared.current_user.id },
      {
        connected() {},

        disconnected() {},

        received(data) {
          setOutgoingFriendRequests(data.initialOutgoingFriendRequests);
          setIncomingFriendRequests(data.initialIncomingFriendRequests);
        },
      },
    );

    return () => {
      channel.unsubscribe();
    };
  }, [shared.current_user.id]);

  return (
    <div id="friendrequest-index" className={className}>
      <h1>Outgoing Friend Requests</h1>
      <div id="outgoing-friendrequests">
        {outgoingFriendRequests.map((friendRequest) => (
          <OutgoingFriendRequest
            key={friendRequest.id}
            friendRequest={friendRequest}
          />
        ))}
      </div>

      <h1>Incoming Friend Requests</h1>
      <div id="incoming-friendrequests">
        {incomingFriendRequests.map((friendRequest) => (
          <IncomingFriendRequest
            key={friendRequest.id}
            friendRequest={friendRequest}
          />
        ))}
      </div>
    </div>
  );
}

FriendRequestIndex.propTypes = {
  initialOutgoingFriendRequests: PropTypes.array,
  initialIncomingFriendRequests: PropTypes.array,
};

const StyledFriendRequestIndex = styled(FriendRequestIndex)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export default StyledFriendRequestIndex;
