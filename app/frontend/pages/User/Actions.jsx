import Relationship from '../Profile/Relationship';
import PropTypes from 'prop-types';

import ChatButton from '../Friendship/Buttons/ChatButton';
import UnfriendButton from '../Friendship/Buttons/UnfriendButton';

import AcceptFriendRequestButton from '../FriendRequest/Buttons/AcceptFriendRequestButton';
import CancelFriendRequestButton from '../FriendRequest/Buttons/CancelFriendRequestButton';
import RejectFriendRequestButton from '../FriendRequest/Buttons/RejectFriendRequestButton';
import SendFriendRequestButton from '../FriendRequest/Buttons/SendFriendRequestButton';

function UserActions({ user, relationship, friendRequest, friendship, chat }) {
  let actions;
  switch (relationship) {
    case Relationship.FRIEND:
      actions = (
        <div>
          <ChatButton chat={chat} />
          <UnfriendButton friendship={friendship} user={user} />
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
          <SendFriendRequestButton user={user} />
        </div>
      );
      break;
  }

  return <div>{actions}</div>;
}

UserActions.propTypes = {
  user: PropTypes.object,
  relationship: PropTypes.string,
  friendRequest: PropTypes.object,
  friendship: PropTypes.object,
  chat: PropTypes.object,
};

export default UserActions;
