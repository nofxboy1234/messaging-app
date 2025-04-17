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
          setOutgoingFriendRequests(data.updatedOutgoingFriendRequests);
          setIncomingFriendRequests(data.updatedIncomingFriendRequests);
        },
      },
    );

    return () => {
      channel.unsubscribe();
    };
  }, [shared.current_user.id]);

  return (
    <div id="friendrequest-index" className={className}>
      <div>
        <div className="friend-request-header">Outgoing Friend Requests</div>
        <div id="outgoing-friendrequests">
          {outgoingFriendRequests.map((friendRequest) => (
            <OutgoingFriendRequest
              key={friendRequest.id}
              friendRequest={friendRequest}
            />
          ))}
        </div>
      </div>

      <div id="incoming-friendrequests">
        <div className="friend-request-header">Incoming Friend Requests</div>
        <div>
          {incomingFriendRequests.map((friendRequest) => (
            <IncomingFriendRequest
              key={friendRequest.id}
              friendRequest={friendRequest}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

FriendRequestIndex.propTypes = {
  className: PropTypes.string,
  initialOutgoingFriendRequests: PropTypes.array,
  initialIncomingFriendRequests: PropTypes.array,
};

const StyledFriendRequestIndex = styled(FriendRequestIndex)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  & .friend-request-header {
    border-bottom: 1px solid var(--border-color);

    @media (max-width: 1160px) {
      border: solid var(--border-color);
      border-width: 0 0 1px;
    }
  }
`;

export default StyledFriendRequestIndex;
