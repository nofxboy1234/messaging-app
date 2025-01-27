import Relationship from '../Profile/Relationship';
import PropTypes from 'prop-types';

import ChatButton from '../Friendship/Buttons/ChatButton';
import UnfriendButton from '../Friendship/Buttons/UnfriendButton';

import AcceptFriendRequestButton from '../FriendRequest/Buttons/AcceptFriendRequestButton';
import CancelFriendRequestButton from '../FriendRequest/Buttons/CancelFriendRequestButton';
import RejectFriendRequestButton from '../FriendRequest/Buttons/RejectFriendRequestButton';
import SendFriendRequestButton from '../FriendRequest/Buttons/SendFriendRequestButton';

import { useEffect, useState } from 'react';
import consumer from '../../channels/consumer';
import { usePage } from '@inertiajs/react';
import styled from 'styled-components';

function UserActions({
  className,
  profileUser,
  initialRelationship,
  initialFriendRequest,
  initialFriendship,
  initialChat,
}) {
  const [chat, setChat] = useState(initialChat);
  const [friendRequest, setFriendRequest] = useState(initialFriendRequest);
  const [friendship, setFriendship] = useState(initialFriendship);
  const [relationship, setRelationship] = useState(initialRelationship);

  const { shared } = usePage().props;

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      {
        channel: 'RelationshipChannel',
        profile_id: profileUser.profile.id,
        current_user_id: shared.current_user.id,
      },
      {
        connected() {},
        disconnected() {},
        received(data) {
          setRelationship(data.relationship);
          setFriendRequest(data.friendRequest);
          setFriendship(data.friendship);
          setChat(data.chat);
        },
      },
    );

    return () => {
      channel.unsubscribe();
    };
  }, [profileUser.profile.id, shared.current_user.id]);

  let actions;
  switch (relationship) {
    case Relationship.FRIEND:
      actions = (
        <div>
          <ChatButton chat={chat} />
          <UnfriendButton friendship={friendship} user={profileUser} />
        </div>
      );
      break;
    case Relationship.INCOMING_REQUEST:
      actions = (
        <div>
          <AcceptFriendRequestButton friendRequest={friendRequest} />
          <RejectFriendRequestButton friendRequest={friendRequest} />
        </div>
      );
      break;
    case Relationship.OUTGOING_REQUEST:
      actions = (
        <div>
          <CancelFriendRequestButton friendRequest={friendRequest} />
        </div>
      );
      break;
    case Relationship.STRANGER:
      actions = (
        <div>
          <SendFriendRequestButton user={profileUser} />
        </div>
      );
      break;
  }

  return <div className={className}>{actions}</div>;
}

UserActions.propTypes = {
  profileUser: PropTypes.object,
  initialRelationship: PropTypes.string,
  initialFriendRequest: PropTypes.object,
  initialFriendship: PropTypes.object,
  initialChat: PropTypes.object,
};

const StyledUserActions = styled(UserActions)`
  border: 1px solid black;
  background-color: var(--bright-pink-crayola);
  padding: 0.5rem;
`;

export default StyledUserActions;
