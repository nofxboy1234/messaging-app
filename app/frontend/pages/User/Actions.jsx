import Relationship from '../Profile/Relationship';
import PropTypes from 'prop-types';

import ChatButton from '../Friend/Buttons/ChatButton';
import UnfriendButton from '../Friend/Buttons/UnfriendButton';

import AcceptFriendRequestButton from '../FriendRequest/Buttons/AcceptFriendRequestButton';
import CancelFriendRequestButton from '../FriendRequest/Buttons/CancelFriendRequestButton';
import RejectFriendRequestButton from '../FriendRequest/Buttons/RejectFriendRequestButton';
import SendFriendRequestButton from '../FriendRequest/Buttons/SendFriendRequestButton';

function UserActions({ user, relationship, friendRequest }) {
  let actions;
  switch (relationship) {
    case Relationship.FRIEND:
      actions = (
        <div>
          <ChatButton friend={user} />
          <UnfriendButton friend={user} />
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
};

export default UserActions;
